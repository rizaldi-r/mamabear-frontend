import {Button} from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary pt-16 pb-8 border-t border-pink-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
              <p className="text-sm text-stone-600">Surabaya, Indonesia</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm text-stone-600">+62 888-888-8888</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm text-stone-600">hi@mamabear.co.id</p>
            </div>
            <div className="flex gap-4 pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-stone-400 hover:text-primary"
              >
                {/* <Instagram className="w-5 h-5" /> */}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-stone-400 hover:text-primary"
              >
                {/* <Facebook className="w-5 h-5" /> */}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-stone-400 hover:text-primary"
              >
                {/* <Youtube className="w-5 h-5" /> */}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-4">Tentang Kami</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cerita MamaBear
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Artikel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-4">Kerja Sama</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Reseller
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Affiliate
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  F.A.Q
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Konsultasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-stone-400 pt-8 border-t border-pink-100">
          © 2024 - MamaBear. All rights reserved
        </div>
      </div>
    </footer>
  );
}
