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
    }  
    render() {  
        var { title, children } = this.props;  
        const { open } = this.state;  
        let openclose = ''
        if (open) {  
            openclose = '-';  
        } else {  
            openclose = '+';  
        }  
        return (  
            <div className="toggle">  
              <div className="question">  
                  {title}  
              </div>
              <div className="plus" onClick={this.togglebutton}>{openclose}</div>
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