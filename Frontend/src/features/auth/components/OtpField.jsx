import OtpInput from "react-otp-input";

const OtpField = ({ value, onChange }) => (
    <OtpInput
        value={value}
        onChange={(next) => onChange(next.replace(/\D/g, ""))}
        numInputs={4}
        inputType="tel"
        shouldAutoFocus
        containerStyle={{ justifyContent: "center", gap: "0.75rem" }}
        renderInput={(props, index) => (
            <input
                {...props}
                style={{}}
                aria-label={`Digit ${index + 1}`}
                className="h-14 w-12 rounded-lg border border-line bg-raised text-center font-display text-2xl text-white transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 sm:h-16 sm:w-14"
            />
        )}
    />
)

export default OtpField
