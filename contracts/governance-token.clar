;; title: governance-token
;; version:
;; summary:
;; description:

;; traits
(define-trait ft-trait
  (
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
    (get-name () (response (string-ascii 32) uint))
    (get-symbol () (response (string-ascii 10) uint))
    (get-decimals () (response uint uint))
    (get-balance (principal) (response uint uint))
    (get-total-supply () (response uint uint))
    (get-token-uri () (response (optional (string-utf8 256)) uint))
  )
)

;; token definitions
(define-fungible-token mhg-token)


;; constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-insufficient-balance (err u101))


;; data vars
;;

;; data maps
;;

;; public functions
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) err-owner-only)
    (try! (ft-transfer? mhg-token amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

;; read only functions
(define-read-only (get-name)
  (ok "Mental Health Governance")
)

(define-read-only (get-symbol)
  (ok "MHG")
)

;; private functions
;;

