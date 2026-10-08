import { useState } from "react";
import { Check, UserRound, Wallet, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageHeading } from "./ui";
import { WalletButton } from "./shell";
export function SettingsPage({ profile = false }: { profile?: boolean }) {
  const [name, setName] = useState("Creator");
  const [saved, setSaved] = useState(false);
  const [saleAlerts, setSaleAlerts] = useState(true);
  const [royaltyAlerts, setRoyaltyAlerts] = useState(true);
  return (
    <>
      <PageHeading
        title={profile ? "User Profile" : "Settings"}
        subtitle={
          profile
            ? "Your creator identity in the RoyaltiChain demo workspace."
            : "Your workspace preferences, all in one place."
        }
      />
      <div className="settings-layout">
        <section className="panel settings-panel">
          <div className="form-section-heading">
            <span className="profile-avatar large-avatar">CR</span>
            <div>
              <h2>Creator Profile</h2>
              <p>Demo account · Digital creator</p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
          >
            <label className="field-label">
              Display name
              <input
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSaved(false);
                }}
                maxLength={40}
              />
            </label>
            <label className="field-label">
              Account type
              <input value="Creator · Demo Mode" disabled />
            </label>
            <label className="field-label">
              Wallet address
              <input value="0x12A4...89BC (fictional)" disabled />
            </label>
            <Button type="submit">
              {saved ? (
                <>
                  <Check />
                  Changes saved
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </section>
        <div>
          <section className="panel settings-panel">
            <h2>Demo Wallet</h2>
            <p className="muted-copy">Explore all workflows without a real wallet.</p>
            <WalletButton />
            <div className="info-note">
              <ShieldCheck size={18} />
              <p>No private keys, seed phrases, or payments are requested.</p>
            </div>
          </section>
          {!profile && (
            <section className="panel settings-panel">
              <h2>Notification Preferences</h2>
              <div className="setting-toggle">
                <div>
                  <strong>Sales activity</strong>
                  <p>In-app demo sale notifications</p>
                </div>
                <Switch
                  checked={saleAlerts}
                  onCheckedChange={setSaleAlerts}
                  aria-label="Sales activity notifications"
                />
              </div>
              <div className="setting-toggle">
                <div>
                  <strong>Royalty updates</strong>
                  <p>In-app demo royalty notifications</p>
                </div>
                <Switch
                  checked={royaltyAlerts}
                  onCheckedChange={setRoyaltyAlerts}
                  aria-label="Royalty update notifications"
                />
              </div>
              <p className="field-help">Preferences apply to this demo session only.</p>
            </section>
          )}
        </div>
      </div>
      <div className="info-note">
        <Info size={18} />
        <p>This workspace uses temporary mock data. Changes reset when the page is refreshed.</p>
      </div>
    </>
  );
}
