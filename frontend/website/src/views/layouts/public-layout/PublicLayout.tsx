"use client";

// Assets
import { defaultFontFamily } from "@/assets/fonts";

// Relative
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

// Utils
import { DefaultLayoutSchema } from "@/utils/schemas/GlobalSchema";
import { ReactQueryClientProvider } from "@/helpers/components/ReactQueryClient";
import Whatsapp from "@/helpers/components/whatsapp/Whatsapp";

// Main
export default function PublicLayout(props: DefaultLayoutSchema) {
  // Props
  const { children } = props;

  // Css
  const className = `${defaultFontFamily} max-h-screen overflow-y-auto bg-white text-black thin-scrollbar`;

  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={className} suppressHydrationWarning={true}>
          <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Whatsapp/>
            <PublicHeader />
            <main className="flex-1 min-h-[calc(100vh-60px)]">{children}</main>
            <PublicFooter />
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
