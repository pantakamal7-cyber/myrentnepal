/*
 * MYRENT Login Page – Phone OTP verification
 * "Nepali Terracotta & Ink" Design
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { Phone, ShieldCheck, ArrowRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LoginStep = "phone" | "otp" | "role";

export default function Login() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [role, setRole] = useState<"Tenant" | "Landlord" | "">("");

  const handleSendOTP = () => {
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    toast.success("OTP sent!", { description: `A 6-digit code has been sent to ${phone}` });
    setStep("otp");
  };

  const handleVerifyOTP = () => {
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    toast.success("Phone verified!");
    setStep("role");
  };

  const handleComplete = () => {
    if (!role) {
      toast.error("Please select your role.");
      return;
    }
    toast.success(`Welcome to MYRENT!`, { description: `Signed in as ${role}` });
    navigate(role === "Landlord" ? "/list-property" : "/listings");
  };

  const handleOtpChange = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#C4622D] flex items-center justify-center mx-auto mb-3 text-white text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif", borderRadius: "2px" }}>
              M
            </div>
            <h1 className="text-2xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
              MY<span className="text-[#C4622D]">RENT</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Kathmandu's Direct Rental Platform</p>
          </div>

          <div className="bg-white border border-border p-6 shadow-sm" style={{ borderRadius: "2px" }}>

            {/* Step: Phone */}
            {step === "phone" && (
              <>
                <h2 className="text-xl font-bold text-[#1A1208] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Sign In / Register
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Enter your phone number to receive a one-time password.
                </p>
                <div className="mb-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Phone Number
                  </label>
                  <div className="flex items-center border border-border focus-within:border-[#C4622D] transition-colors" style={{ borderRadius: "2px" }}>
                    <span className="px-3 py-2.5 text-sm text-muted-foreground border-r border-border bg-muted">+977</span>
                    <div className="flex items-center flex-1 px-3">
                      <Phone size={14} className="text-[#C4622D] mr-2 shrink-0" />
                      <input
                        type="tel"
                        placeholder="98XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 py-2.5 text-sm text-[#1A1208] bg-transparent outline-none"
                        onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSendOTP}
                  className="w-full bg-[#C4622D] text-white font-bold py-3 text-sm hover:bg-[#a85226] transition-colors flex items-center justify-center gap-2 active:scale-95"
                  style={{ borderRadius: "2px" }}
                >
                  Send OTP <ArrowRight size={16} />
                </button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By continuing, you agree to MYRENT's Terms of Use and Privacy Policy.
                </p>
              </>
            )}

            {/* Step: OTP */}
            {step === "otp" && (
              <>
                <button onClick={() => setStep("phone")} className="flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-[#C4622D] transition-colors">
                  <ChevronLeft size={14} /> Back
                </button>
                <h2 className="text-xl font-bold text-[#1A1208] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Enter OTP
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  We sent a 6-digit code to <strong>+977-{phone}</strong>
                </p>
                <div className="flex gap-2 mb-5 justify-center">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-10 h-12 text-center text-lg font-bold border border-border text-[#1A1208] bg-[#F5EFE0] outline-none focus:border-[#C4622D] transition-colors"
                      style={{ borderRadius: "2px" }}
                    />
                  ))}
                </div>
                <button
                  onClick={handleVerifyOTP}
                  className="w-full bg-[#C4622D] text-white font-bold py-3 text-sm hover:bg-[#a85226] transition-colors flex items-center justify-center gap-2"
                  style={{ borderRadius: "2px" }}
                >
                  Verify OTP <ShieldCheck size={16} />
                </button>
                <button
                  onClick={() => toast.info("OTP resent!", { description: "A new code has been sent." })}
                  className="w-full mt-3 text-sm text-muted-foreground hover:text-[#C4622D] transition-colors"
                >
                  Didn't receive it? Resend OTP
                </button>
              </>
            )}

            {/* Step: Role Selection */}
            {step === "role" && (
              <>
                <h2 className="text-xl font-bold text-[#1A1208] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  I am a...
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Select your role on MYRENT.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {(["Tenant", "Landlord"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`p-4 border-2 text-center transition-all ${role === r ? "border-[#C4622D] bg-[#C4622D]/5" : "border-border hover:border-[#C4622D]/50"}`}
                      style={{ borderRadius: "2px" }}
                    >
                      <div className="text-2xl mb-1">{r === "Tenant" ? "🏠" : "🔑"}</div>
                      <div className="font-bold text-[#1A1208] text-sm">{r}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {r === "Tenant" ? "Looking for a place" : "Have a property to rent"}
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleComplete}
                  className="w-full bg-[#C4622D] text-white font-bold py-3 text-sm hover:bg-[#a85226] transition-colors flex items-center justify-center gap-2"
                  style={{ borderRadius: "2px" }}
                >
                  Enter MYRENT <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>

          {/* Trust note */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
            <ShieldCheck size={13} className="text-[#7A8C6E]" />
            <span>Your phone number is only used for OTP verification</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
