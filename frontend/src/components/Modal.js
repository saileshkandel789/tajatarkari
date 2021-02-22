import React , {Component ,Fragment} from 'react';

class Modal extends Component {

    // shouldComponentUpdate(nextProps,nextState){
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }
    
    render() {
        return(
            <Fragment>
                {/* <BackDrop show={this.props.show} clicked={this.props.modalClosed}/> */}
                <div 
                    className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translayeY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }

} 

export default Modal;