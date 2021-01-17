import React, { Component } from 'react'  
export class Toggle extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            open: false,  
        };  
        this.togglebutton = this.togglebutton.bind(this);  
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
        let openclose = ''
        let className = 'toggle'
        if (open) {  
            openclose = '→';  
            className = 'toggle expand'
        } else {  
            openclose = '+';  
        }  
        return (               
            <div className={className} role="button" onClick={this.togglebutton} onKeyDown={this.togglebutton} aria-hidden="true">              
              <div className="question">  
                  {title}  
              </div>
              <div className="plus">{openclose}</div>
              <div className="faq-divider"></div>
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