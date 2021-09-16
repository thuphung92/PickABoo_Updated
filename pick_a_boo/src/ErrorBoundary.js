import { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Alert>
          There was an error with this listing. <Alert.Link as={Link} to="/">Click here</Alert.Link> to go back to the home page.
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;