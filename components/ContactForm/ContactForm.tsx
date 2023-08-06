import { useContext, useRef, useState } from 'react';
import { styled } from 'styled-components';

export const ContactForm = styled.form`
  /* display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 500px;
  border: 1px solid ${(p) => p.theme.color};
  padding: 20px;
  border-radius: 10px;
  transition: 1s; */

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const FormContact = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div:first-child {
    margin-right: 15px;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`;

export const FormLabel = styled.label`
  display: none;
  margin-bottom: 5px;
`;

export const FormInput = styled.input<{ invalid: boolean }>`
  /* margin-bottom: 10px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid ${(p) => (p.invalid ? p.theme.error : p.theme.formBorder)};
  outline: none;
  background-color: ${(p) => p.theme.background};
  color: ${(p) => p.theme.primary};
  padding: 0px 8px;

  :-webkit-autofill,
  :-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  @media only screen and (max-width: 768px) {
    font-size: 18px;
  } */
`;

export const FormMessage = styled.textarea<{ invalid: boolean }>`
  margin-bottom: 10px;
  border-radius: 10px;
  resize: none;
  border: 1px solid ${(p) => (p.invalid ? p.theme.error : p.theme.formBorder)};
  outline: none;
  background-color: ${(p) => p.theme.background};
  color: ${(p) => p.theme.primary};
  font-family: Inter, sans-serif;
  padding: 5px 8px;

  @media only screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Button = styled.button`
  height: 30px;
  border-radius: 10px;
  background-color: ${(p) => p.theme.formBorder};
  border: none;
  color: ${(p) => p.theme.primary};

  &:hover {
    transition: 0.5s;
    cursor: pointer;
    opacity: 80%;
  }
`;

export default function Contact() {
  //   const notificationCtx = useContext(NotificationContext);
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(false);

  const form = useRef<HTMLFormElement>(null as any);
  const email = useRef<HTMLInputElement>(null as any);
  const message = useRef<HTMLTextAreaElement>(null as any);
  const emailCurrent = email.current;
  const messageCurrent = message.current;

  //   const sendEmail = (e: any) => {
  //     if (!allowSubmit) {
  //       notificationCtx.showNotification({
  //         title: 'Error',
  //         message: 'Message already sent',
  //         status: 'error',
  //       });
  //       return;
  //     }

  //     e.preventDefault();
  //     if (
  //       !emailCurrent?.value ||
  //       emailCurrent?.value.trim() === '' ||
  //       !emailCurrent?.value.includes('@')
  //     ) {
  //       notificationCtx.showNotification({
  //         title: 'Error',
  //         message: 'Please enter a valid email',
  //         status: 'error',
  //       });
  //       setInvalidEmail(true);
  //       return;
  //     }
  //     if (!messageCurrent?.value || messageCurrent?.value.trim() === '') {
  //       notificationCtx.showNotification({
  //         title: 'Error',
  //         message: 'Please enter a message',
  //         status: 'error',
  //       });
  //       setInvalidMessage(true);
  //       return;
  //     }

  //     notificationCtx.showNotification({
  //       title: 'Sending...',
  //       message: 'Please wait. Processing',
  //       status: 'Pending',
  //     });

  //     emailjs
  //       .sendForm(
  //         `${process.env.NEXT_PUBLIC_EMAILJS_SERVICEID}`,
  //         `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID}`,
  //         form.current,
  //         `${process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY}`
  //       )
  //       .then((result) => {
  //         notificationCtx.showNotification({
  //           title: 'Success',
  //           message: 'Successfully sent message!',
  //           status: 'success',
  //         });
  //         setAllowSubmit(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         notificationCtx.showNotification({
  //           title: 'Error',
  //           message: error.text || 'Something went wrong',
  //           status: 'error',
  //         });
  //       });
  //   };

  function changeHandler() {
    if (emailCurrent?.value.includes('@')) {
      setInvalidEmail(false);
    }
    if (messageCurrent?.value) {
      setInvalidMessage(false);
    }
  }

  return (
    <ContactForm ref={form} onSubmit={undefined}>
      <h1>Hello</h1>
      {/* <FormContact>
        <FormField>
          <FormLabel htmlFor="user_name">Name</FormLabel>
          <FormInput
            type="text"
            id="user_name"
            name="user_name"
            placeholder="Name"
            invalid={false}
          ></FormInput>
        </FormField>
        <FormField>
          <FormLabel htmlFor="user_email">Email</FormLabel>
          <FormInput
            type="text"
            id="user_email"
            name="user_email"
            placeholder="Email"
            ref={email}
            invalid={invalidEmail}
            onChange={changeHandler}
          ></FormInput>
        </FormField>
      </FormContact>
      <FormField>
        <FormLabel htmlFor="subject">Subject</FormLabel>
        <FormInput
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          invalid={false}
        ></FormInput>
      </FormField>
      <FormField>
        <FormLabel htmlFor="message">Message</FormLabel>
        <FormMessage
          id="message"
          name="message"
          placeholder="Message"
          rows={8}
          ref={message}
          invalid={invalidMessage}
          onChange={changeHandler}
        ></FormMessage>
      </FormField>
      <Button type="submit" value="Send">
        Send Message
      </Button> */}
    </ContactForm>
  );
}
