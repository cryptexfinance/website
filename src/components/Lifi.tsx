import React, { useMemo } from "react"
import { LiFiWidget, WidgetConfig } from '@lifi/widget'
import { useTranslation } from "react-i18next"
import { Stack } from "react-bootstrap"


export const Lifi = ({
  fromChain,
  toChain,
  fromToken,
  toToken,
}: {
  fromChain?: number,
  toChain?: number,
  fromToken?: string,
  toToken?: string,
}) => {
  const { i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage || "en")

  const lifiConfig = useMemo(() => {
    const lifiConfig: WidgetConfig = {
      appearance: 'dark',
      fromChain,
      toChain,
      hiddenUI: ['appearance'],
      integrator: "cryptex-finance",
      languages: {
        default: currentLanguage as "bn" | "de" | "en" | "es" | "fr" | "id" | "it" | "ko" | "pt" | "th" | "tr" | "uk" | "vi" | "zh" | undefined,
      },
      theme: {
        palette: {
          primary: { main: '#A440F2' },
          secondary: { main: '#F5B5FF' },
          background: { default: "#0a0a0a", paper: "#0a0a0a" },
          text: { primary: "#f5f5f5", disabled: "#aaa9bf" }
        },
        shape: {
          borderRadius: 5,
          borderRadiusSecondary: 5,
        },
        typography: {
          fontFamily: 'Helvetica Neue',
        },
        container: {
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
          borderRadius: '16px',
          width: 'fit-content',
        },
        components: {
          MuiCard: {
            defaultProps: { variant: 'outlined' },
          },
          MuiInputCard: {
            defaultProps: { variant: 'outlined' },
          },
        }
      },
      fromToken,
      toToken,
      variant: "wide",
    }
    return lifiConfig
  },
    // eslint-disable-next-line
    [currentLanguage]
  )

  return (
    <Stack direction="vertical" className="lifi-widget align-items-center">
      <LiFiWidget integrator="Cryptex Finance" config={lifiConfig} />
    </Stack>
  );
};
