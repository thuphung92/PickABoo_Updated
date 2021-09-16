
import { Alert } from 'react-bootstrap';

export const ErrorMessage = (errStatus) => {
   if (errStatus === 400) {
       return <Alert variant = 'danger'>Please Enter A Valid Location!<br/>
       Tips: A valid Zip Code is also acceptable!</Alert>
    }
    else if (errStatus === 500) {
        return <Alert variant = 'info'>
            There was an error happen while trying to connect to the server. Please try again.
            </Alert>
    }
    else { return null }
}
