;; title: grants-dao
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;;

;; constants
;;
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

;; read only functions
;;

;; private functions
;;

