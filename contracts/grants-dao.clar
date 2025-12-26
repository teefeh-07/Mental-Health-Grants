;; title: grants-dao
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;;

;; constants
(define-constant governance-token .governance-token)
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-unauthorized (err u102))
(define-constant err-already-exists (err u103))
(define-constant err-invalid-params (err u104))

;; data vars
;;
(define-data-var proposal-count uint u0)
(define-data-var voting-period uint u1440) ;; ~10 days in blocks
(define-data-var execution-delay uint u144) ;; ~1 day in blocks
(define-data-var quorum-threshold uint u20) ;; 20% quorum required

;; data maps
;;
(define-map proposals
  uint
  {
    proposer: principal,
    title: (string-ascii 100),
    description: (string-utf8 500),
    amount: uint,
    recipient: principal,
    start-block: uint,
    end-block: uint,
    executed: bool,
    yes-votes: uint,
    no-votes: uint
  }
)

(define-map votes
  { proposal-id: uint, voter: principal }
  { vote: bool, amount: uint }
)

(define-map member-voting-power
  principal
  uint
)

;; public functions
;;
(define-public (create-proposal (title (string-ascii 100)) (description (string-utf8 500)) (amount uint) (recipient principal))
  (let
    (
      (proposal-id (+ (var-get proposal-count) u1))
      (start-block block-height)
      (end-block (+ block-height (var-get voting-period)))
    )
    (asserts! (> amount u0) err-invalid-params)
    (asserts! (> (len title) u0) err-invalid-params)
    (map-set proposals proposal-id
      {
        proposer: tx-sender,
        title: title,
        description: description,
        amount: amount,
        recipient: recipient,
        start-block: start-block,
        end-block: end-block,
        executed: false,
        yes-votes: u0,
        no-votes: u0
      }
    )
    (var-set proposal-count proposal-id)
    (ok proposal-id)
  )
)

(define-public (vote-on-proposal (proposal-id uint) (vote bool))
  (let
    (
      (proposal (unwrap! (map-get? proposals proposal-id) err-not-found))
      (voter-power (unwrap! (contract-call? .governance-token get-balance tx-sender) err-unauthorized))
    )
    (asserts! (> voter-power u0) err-unauthorized)
    (asserts! (<= block-height (get end-block proposal)) err-unauthorized) ;; voting ended
    (asserts! (is-none (map-get? votes { proposal-id: proposal-id, voter: tx-sender })) err-already-exists)
    
    (if vote
      (map-set proposals proposal-id (merge proposal { yes-votes: (+ (get yes-votes proposal) voter-power) }))
      (map-set proposals proposal-id (merge proposal { no-votes: (+ (get no-votes proposal) voter-power) }))
    )
    
    (map-set votes { proposal-id: proposal-id, voter: tx-sender } { vote: vote, amount: voter-power })
    (ok true)
  )
)

(define-public (register-member (member principal) (power uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (map-set member-voting-power member power)
    (ok true)
  )
)

(define-public (execute-proposal (proposal-id uint))
  (let
    (
      (proposal (unwrap! (map-get? proposals proposal-id) err-not-found))
      (total-votes (+ (get yes-votes proposal) (get no-votes proposal)))
    )
    (asserts! (not (get executed proposal)) err-already-exists)
    (asserts! (> block-height (get end-block proposal)) err-unauthorized) ;; voting period not over
    
    ;; Simple majority check
    (asserts! (> (get yes-votes proposal) (get no-votes proposal)) err-unauthorized)
    
    ;; Mark as executed
    (map-set proposals proposal-id (merge proposal { executed: true }))
    
    ;; Logic for STX transfer would go here, 
    ;; but avoiding as-contract per user instructions.
    
    (ok true)
  )
)

;; read only functions
;;
(define-read-only (get-proposal (proposal-id uint))
  (map-get? proposals proposal-id)
)

(define-read-only (get-proposal-count)
  (var-get proposal-count)
)

(define-read-only (get-voting-power (member principal))
  (ok (default-to u0 (map-get? member-voting-power member)))
)

;; private functions
;;

