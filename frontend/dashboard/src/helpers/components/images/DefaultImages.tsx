// Import - default
import { useNavigate } from "react-router-dom";

// Import - assets
import { hst_logo_png } from "@/assets/images";

// Import - helpers
import { default as Image } from "@/helpers/components/images/Image";

// Display a logo image
export const LogoImage = (props: any) => {
  // Props
  const { isRedirect, ...rest } = props;

  // Hooks
  const navigate = useNavigate();

  return (
    <Image
      src={hst_logo_png}
      alt={hst_logo_png}
      divCss="w-[44px] h-[44px] grid place-items-center h-full mb-1.5"
      imgCss="w-full h-full object-contain"
      onClick={() => {
        if (isRedirect) navigate("/");
      }}
      {...rest}
    />
  );
};

export const CenteredLogoImage = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:hidden">
    <div className="pointer-events-auto">
      <LogoImage />
    </div>
  </div>
);

export const ModifiedLogoImage = (props: any) => {
  // Props
  const { hideText, textColor } = props;

  // Color for text
  const color = textColor ? `${textColor} ` : "text-black";

  return (
    <div className="w-full px-2 flex items-center gap-1.5">
      <LogoImage />
      {!hideText && (
        <div
          className={`${color}font-poppins font-medium text-balance uppercase flex flex-col justify-center items-center gap-1 animate-showUp`}
        >
          <p className="text-sm font-bold animate-showUp">
            Himalayan Single Track
          </p>

          <p className="text-[9px] text-center font-medium">
            The Leaders in Mountain Biking in Nepal
          </p>
        </div>
      )}
    </div>
  );
};

export const DashboardLogo = (props: any) => {
  // Props
  const { css, extendCss, ...rest } = props;

  // Parent logo div css
  const parentLogoDivCss =
    css ??
    `${
      extendCss ? `${extendCss} ` : ""
    }w-full bg-brand-yellow-600 flex items-center bg-brand-gray-600 h-[64px]`;

  return (
    <div className={parentLogoDivCss}>
      <ModifiedLogoImage {...rest} />
    </div>
  );
};
