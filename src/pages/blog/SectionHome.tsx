import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

const SectionHome = () => { 
  const { t } = useTranslation()

  return (
    <div className="home">
      <div className="description">
        <h2 className="heading-secondary">{t('blog-title')}</h2>
        <p className="subheader">
          {t('blog-subtitle')}
        </p>
      </div>      
    </div>
  );
}

export default SectionHome;
