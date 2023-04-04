/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51MssygL6wjTdPSgP1dUSPUhbLsGku5t6pKwvpR3rSUh744AFZlV5jrPxkDmehjtUvFUIOXsfpjohVUL77DzhNw3k00oXdAj3Pw'
  );
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
