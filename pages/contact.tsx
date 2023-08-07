import { styled } from 'styled-components';
import { useContext, useRef, useState } from 'react';
import { sendForm } from 'emailjs-com';
import { NotificationContext } from '../context/notification/NotificationContext';

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 55px);
  padding: 55px 0;
  background-color: ${(props) => props.theme.background};
`;

export const ContactTitle = styled.h1`
  font-family: 'Raleway';
  font-weight: 100;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 500px;
  transition: 1s;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Input = styled.input<{ invalid: boolean }>`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Open sans';
  border: 1px solid ${(p) => (p.invalid ? p.theme.error : p.theme.formBorder)};
  background-color: ${(props) => props.theme.background};
`;

const Textarea = styled.textarea<{ invalid: boolean }>`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Open sans';
  resize: none;
  height: 120px;
  border: 1px solid ${(p) => (p.invalid ? p.theme.error : p.theme.formBorder)};
  background-color: ${(props) => props.theme.background};
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.dark};
  color: ${(props) => props.theme.background};
  border: none;
  border-radius: 5px;
  font-family: 'Open sans';
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Contact() {
  const notificationCtx = useContext(NotificationContext);
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(false);
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  const formRef = useRef();

  function handleSubmit(e) {
    if (!allowSubmit) {
      notificationCtx.showNotification({
        title: 'Error',
        message: 'Message already sent',
        status: 'error',
      });
      return;
    }

    e.preventDefault();
    if (!enteredName || enteredName.trim() === '') {
      notificationCtx.showNotification({
        title: 'Error',
        message: 'Please enter a valid name',
        status: 'error',
      });
      setInvalidName(true);
      return;
    }
    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@')
    ) {
      notificationCtx.showNotification({
        title: 'Error',
        message: 'Please enter a valid email',
        status: 'error',
      });
      setInvalidEmail(true);
      return;
    }
    if (!enteredMessage || enteredMessage.trim() === '') {
      notificationCtx.showNotification({
        title: 'Error',
        message: 'Please enter a message',
        status: 'error',
      });
      setInvalidMessage(true);
      return;
    }

    notificationCtx.showNotification({
      title: 'Sending...',
      message: 'Please wait. Processing',
      status: 'Pending',
    });

    const emailData = {
      from_name: enteredName,
      reply_to: enteredEmail,
      message: enteredMessage,
    };

    // Send an email
    sendForm(
      `${process.env.NEXT_PUBLIC_EMAILJS_SERVICEID}`,
      `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID}`,
      formRef.current,
      `${process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY}`
    )
      .then((response) => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully sent message!',
          status: 'success',
        });
        setAllowSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        notificationCtx.showNotification({
          title: 'Error',
          message: err.text || 'Something went wrong',
          status: 'error',
        });
      });
  }

  function nameChangeHandler(event) {
    setEnteredName(event.target.value);
    if (event.target.value) {
      setInvalidName(false);
    }
  }

  function emailChangeHandler(event) {
    setEnteredEmail(event.target.value);
    if (event.target.value.includes('@')) {
      setInvalidEmail(false);
    }
  }

  function messageChangeHandler(event) {
    setEnteredMessage(event.target.value);
    if (event.target.value) {
      setInvalidMessage(false);
    }
  }

  return (
    <ContactContainer>
      <ContactTitle>Get in Touch</ContactTitle>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input
          type="text"
          placeholder="Your Name"
          name="from_name"
          value={enteredName}
          onChange={nameChangeHandler}
          invalid={invalidName}
        />
        <Input
          type="email"
          placeholder="Your Email"
          name="reply_to"
          value={enteredEmail}
          onChange={emailChangeHandler}
          invalid={invalidEmail}
        />
        <Textarea
          placeholder="Your Message"
          name="message"
          value={enteredMessage}
          onChange={messageChangeHandler}
          invalid={invalidMessage}
        ></Textarea>
        <Button type="submit">Send Message</Button>
      </Form>
    </ContactContainer>
  );
}
