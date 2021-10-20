import React, { useContext, useState } from "react"
import Col from "react-bootstrap/esm/Col";
import { Accordion, AccordionContext, Button, Card, Tabs, Tab, TabContent } from "react-bootstrap";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import Toggle from "../components/Toggle";
import { faq } from "../../../components/utils/faq";


const MobileQuestionButton = ({ children, eventKey, callback }) => {
  const currentEventKey = useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <button
      type="button"
      onClick={decoratedOnClick}
      className={isCurrentEventKey ? "btn-faq-group active" : "btn-faq-group"}
    >
      {children}
    </button>
  );
};

const SectionFaq = () => {
  const breakpoints = useBreakpoint();
  const [expanded, setExpanded] = useState(0)
  const [tabKey, setTabKey] = useState("tcap");

  const addToExpanded = num => {
    setExpanded(expanded + num)
  }

  const className =
    expanded == 0
      ? "section-faq"
      : expanded == 1
      ? "section-faq expand1"
      : expanded <= 2
      ? "section-faq expand2"
      : expanded <= 4
      ? "section-faq expand4"
      : "section-faq expand6"

  const tabContent = (questions) => {
    const middle = Math.ceil(questions.length / 2);
    const questions1 = questions.slice(0, middle);
    const questions2 = questions.slice(middle, questions.length);

    return (
      <Col md={12} lg={12} className="faq-row row">
        <Col xs={12} sm={12} md={6} lg={6} className="faq-box">
          {questions1.map((q) => 
            <Toggle title={q.question} addToExpanded={addToExpanded} showDivider={true}>
              {q.answer}
            </Toggle>
          )}
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} className="faq-box">
          {questions2.map((q) => 
            <Toggle title={q.question} addToExpanded={addToExpanded} showDivider={true}>
              {q.answer}
            </Toggle>  
          )}
        </Col>
      </Col>  
    );
  }

  return (
    <section id="faq" className={className}>
      <div className="faq-title header">FAQ</div>
      <div className="faq-subtitle content">
        Common questions we are asked.
      </div>
      <div>
        {breakpoints.smm ? (
          <Accordion className="faq-mobile">
            {faq.map((q) => {
              return  <Card>
                        <Card.Header>
                          <MobileQuestionButton eventKey={q.group_key}>
                            <div className="btn-faq-container">
                              <div className="title">
                                {q.group_name}
                              </div>
                              <div className="icon">
                                <span>▼</span>
                              </div>
                            </div>  
                          </MobileQuestionButton>
                        </Card.Header>
                        <Accordion.Collapse eventKey={q.group_key}>
                          <Card.Body>{tabContent(q.questions)}</Card.Body>
                        </Accordion.Collapse>
                      </Card>     
            })}
          </Accordion>
        ) : (
          <Tabs
            id="faq-tab"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
          >
            {faq.map((q) => {
              return <Tab
                eventKey={q.group_key}
                tabClassName="faq-tab"
                title={<h6>{q.group_name}</h6>}
              >
                <TabContent className="faq-content">
                  {tabContent(q.questions)}
                </TabContent>
              </Tab>
            })}
          </Tabs>
        )}
      </div>
    </section>
  )
}

export default SectionFaq
