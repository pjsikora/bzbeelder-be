import  {Component} from 'react';
import ReactDOM from 'react-dom';

class Root extends Component {
  constructor(props) {
    super(props);
    this.progressRoot = document.getElementById('bzb');
  }

  render() {
    return ReactDOM.createPortal(
        this.props.children,
        this.progressRoot
    );
  }
}

export default Root;
