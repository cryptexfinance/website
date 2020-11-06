import React from 'react'
import Toggle from '../components/Toggle'

const SectionFaq = () => {
  return (
      <section id="faq" className="section-faq">
        <div className="row">
          <div className="faq-title header">
            FAQ
          </div>
          <div className="faq-subtitle content">Common questions we are asked.</div>
        </div>
        <div className="faq-row row">
          <div className="faq-box">
            <Toggle title="What are Cryptex products?"> 
              <div className="answer">Currently, we offer accredited investors and qualified institutional buyers three products: NOTE.X, MINT.X, AND TCAP.X. Each product offers accesses a different set of investment features and offers a wide range of potential returns to investors.</div>
            </Toggle>

            <Toggle title="Why should I use Cryptex?">
              <div className="answer">Currently, we offer accredited investors and qualified institutional buyers three products: NOTE.X, MINT.X, AND TCAP.X. Each product offers accesses a different set of investment features and offers a wide range of potential returns to investors.</div>
            </Toggle>

            <Toggle title="Is investing in Cryptex products safe?">
              <div className="answer">Currently, we offer accredited investors and qualified institutional buyers three products: NOTE.X, MINT.X, AND TCAP.X. Each product offers accesses a different set of investment features and offers a wide range of potential returns to investors.</div>
            </Toggle>
          </div>

          <div className="faq-main-divider"></div>

          <div className="faq-box">
            <Toggle title="What are Cryptex products?"> 
              <div className="answer">Currently, we offer accredited investors and qualified institutional buyers three products: NOTE.X, MINT.X, AND TCAP.X. Each product offers accesses a different set of investment features and offers a wide range of potential returns to investors.</div>
            </Toggle>

            <Toggle title="Why should I use Cryptex?">
              <div className="answer">Currently, we offer accredited investors and qualified institutional buyers three products: NOTE.X, MINT.X, AND TCAP.X. Each product offers accesses a different set of investment features and offers a wide range of potential returns to investors.</div>
            </Toggle>

            <Toggle title="Is investing in Cryptex products safe?">
              <div className="answer">Currently, we offer accredited investors and qualified institutional buyers three products: NOTE.X, MINT.X, AND TCAP.X. Each product offers accesses a different set of investment features and offers a wide range of potential returns to investors.</div>
            </Toggle>
          </div>
          
          {/* <div className="faq-box">
            <div class="toggle">
              <div class="togglet heading-secondary">What are Cryptex products?</div>
              <div className="faq-plus heading-secondary">-</div>
              <div class="faq-divider"></div>
              <div class="togglec content">Currently, we offer accredited investors and qualified institutional buyers three products: NOTE.X, MINT.X, AND TCAP.X. Each product offers accesses a different set of investment features and offers a wide range of potential returns to investors.</div>
            </div>

            <div class="toggle">
              <div class="togglet heading-secondary">Why should I use Cryptex?</div>
              <div className="faq-plus heading-secondary">-</div>
              <div class="faq-divider"></div>
              <div class="togglec content">Currently, we offer accredited investors and qualified institutional buyers three products: NOTE.X, MINT.X, AND TCAP.X. Each product offers accesses a different set of investment features and offers a wide range of potential returns to investors.</div>
            </div>

            <div class="toggle">
              <div class="togglet heading-secondary">Is investing in Cryptex products safe?</div>
              <div className="faq-plus heading-secondary">-</div>
              <div class="faq-divider"></div>
              <div class="togglec content">Currently, we offer accredited investors and qualified institutional buyers three products: NOTE.X, MINT.X, AND TCAP.X. Each product offers accesses a different set of investment features and offers a wide range of potential returns to investors.</div>
            </div>
          </div> */}

        </div>
      </section>
  )
}

export default SectionFaq