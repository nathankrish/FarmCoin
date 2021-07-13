import React from 'react';
import {
    SquarePaymentForm,
    CreditCardNumberInput,
    CreditCardExpirationDateInput,
    CreditCardPostalCodeInput,
    CreditCardCVVInput,
    CreditCardSubmitButton,
  } from 'react-square-payment-form'
  import 'react-square-payment-form/lib/default.css'
import { Card, Typography, CardContent } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
      maxWidth: 600,
      marginTop: 100,
      marginLeft: 100
    },
    text: {
      marginBottom: 25
    }
  });
  

class SquareWidget extends React.Component {      

    constructor(props) {
      super(props)
      this.state = {
        errorMessages: [],
      }
    }
  
    cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
      if (errors) {
        this.setState({ errorMessages: errors.map(error => error.message) })
        return
      }
  
      this.setState({ errorMessages: [] })
      alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
    }
  
    createVerificationDetails() {
      return {
        amount: "100.00",
        currencyCode: "USD",
        intent: "CHARGE",
        billingContact: {
          familyName: "Smith",
          givenName: "John",
          email: "jsmith@example.com",
          country: "GB",
          city: "London",
          addressLines: ["1235 Emperor's Gate"],
          postalCode: "SW7 4JA",
          phone: "020 7946 0532"
        }
      }
    }
  
    render() {
        const { classes } = this.props;
      return (
        <Card  className = {classes.root}>
        <div>
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2" className = {classes.text}>
            Repay Loan with Square
            </Typography>
          <SquarePaymentForm
            sandbox={true}
            applicationId={"sandbox-sq0idb-PHQAjv4aC3RXgYVT-GnZGA"}
            locationId={"LKW939GN3M8PX"}
            cardNonceResponseReceived={this.cardNonceResponseReceived}
            createVerificationDetails={this.createVerificationDetails}
          >
                <fieldset className="sq-fieldset">
                <CreditCardNumberInput />
                <div className="sq-form-third">
                <CreditCardExpirationDateInput />
                </div>

                <div className="sq-form-third">
                <CreditCardPostalCodeInput />
                </div>

                <div className="sq-form-third">
                <CreditCardCVVInput />
                </div>

                
            </fieldset>

            <CreditCardSubmitButton>
                Pay
            </CreditCardSubmitButton>
          </SquarePaymentForm>
  
          <div className="sq-error-message">
            {this.state.errorMessages.map(errorMessage =>
              <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
            )}
          </div>
            </CardContent>
        </div>
        </Card>
      )
    }
  }

  export default withStyles(styles, { withTheme: true })(SquareWidget);
