import bmcLogo from "@/assets/logo bmc.png";

const FooterSection = () => (
  <footer className="border-t border-border py-12 px-4">
    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={bmcLogo} alt="BMC" className="h-10 w-10 object-contain" />
        <div>
          <p className="font-display font-bold text-sm">BMC 2026</p>
          <p className="text-xs text-muted-foreground">Faculty of Medicine, Universitas Brawijaya</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">© 2026 BMC. All rights reserved.</p>
    </div>
  </footer>
);

export default FooterSection;
