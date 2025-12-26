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

;; read only functions
;;

;; private functions
;;

