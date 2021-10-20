import React, { Component } from 'react'  
export class Toggle extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            open: false,  
        };  
        this.togglebutton = this.togglebutton.bind(this);
        this.customClassName = typeof (props.className) !== "undefined" ? props.className : "";
        this.showDivider = typeof (props.showDivider) !== "undefined" && props.showDivider;
    }  
    togglebutton() {  
        const { open } = this.state;  
        this.setState({  
            open: !open,  
        }); 
        let value = !open ? 1 : -1
        this.props.addToExpanded(value)
    }  
    render() {  
        var { title, children } = this.props;  
        const { open } = this.state;  
        let openclose = "";
        let className = this.customClassName.concat(" toggle").trim();
        if (open) {  
            openclose = "→";  
            className = this.customClassName.concat("toggle expand").trim();
        } else {  
            openclose = "+";  
        }  
        return (               
            <div className={className} role="button" onClick={this.togglebutton} onKeyDown={this.togglebutton} aria-hidden="true">              
              <div className="question">  
                  {title}  
              </div>
              <div className="plus">{openclose}</div>
              {this.showDivider && <div className="faq-divider"></div>}
              {open && (  
                <>  
                    {children}  
                </>  
              )}           
            </div>
        );  
    }  
}  
export default Toggle