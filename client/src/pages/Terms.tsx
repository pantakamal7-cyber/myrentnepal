import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="flex-1 container max-w-4xl py-12 px-4">
        <h1 className="text-4xl font-black text-[#1A1208] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Terms & Conditions
        </h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold text-[#C4622D] mb-8">
          Last Updated: June 2026
        </p>

        <div className="bg-white border border-border p-8 space-y-6 text-[#1A1208]/90 text-sm leading-relaxed" style={{ borderRadius: "2px" }}>
          <section>
            <h2 className="text-lg font-bold text-[#1A1208] mb-2">1. The MYRENT Anti-Broker Pledge</h2>
            <p>
              MYRENT is a strict, 100% broker-free property marketplace in Kathmandu. By listing a property, you solemnly swear that you are the direct owner or an authorized immediate family member. Real estate agents, middlemen, and brokers are strictly prohibited. Any listing found violating this pledge will be permanently banned without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1208] mb-2">2. Verification Requirement</h2>
            <p>
              To protect tenants from fraudulent rentals, landlords must provide verification documents (Lalpurja, Citizenship, or Utility Bills). MYRENT reserves the right to withhold any property listing from going live until our verification processes are satisfied.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1208] mb-2">3. 14-Day Expiry Notice</h2>
            <p>
              To ensure data stays current for home-seekers, all property listings automatically expire and disappear after 14 days. Landlords will receive an automated notification to manually re-confirm availability if the property remains unrented.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1208] mb-2">4. Limitation of Liability</h2>
            <p>
              MYRENT acts solely as an open communications matching platform. We are not responsible for tenant behavior, landlord conduct, utility outages (water/electricity disputes), rental payment defaults, or the physical condition of any property listed on our application.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
