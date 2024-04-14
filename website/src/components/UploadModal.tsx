'use client';

import { useEffect, useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import Button from './Button';
import { useSession } from 'next-auth/react';
// import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete';

const Name = styled.div`
  margin-right: 10px;
  padding: 12px;
  max-width: 100%;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const Info = styled.input`
  width: 100%;
  height: 25px;
  padding: 12px;
  border: 1px solid white;
  /* cursor: pointer; */
  font: inherit;
`;

const InfoArea = styled.textarea`
  width: 100%;
  height: 25px;
  padding: 12px;
  border: 1px solid white;
  /* cursor: pointer; */
  height: 4em;
  width: 100%;
  resize: none;
  font: inherit;
`;

const Submit = styled(Button)`
  // position: ;
  // bottom: 16px;
  width: 100%;
  margin: 32px 0 0;
`;

interface UploadModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadModal = (props: UploadModalProps): JSX.Element => {
  const { visible, setVisible } = props;

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  const [description, setDesc] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setDesc(e.target.value);
  };

  // const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setPhone(e.target.value);
  // };

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setEmail(e.target.value);
  // };

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      setVisible(false);
    }
  }, [session]);

  // const { ref } = usePlacesWidget({
  //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   onPlaceSelected: (place) => console.log(place),
  // });

  const handleSubmit = async () => {
    const eventData = {
      title,
      location,
      description,
    };

    const response = await fetch('/api/event/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      console.log('Event submitted successfully!');
      setVisible(false);
      setTitle('');
      setLocation('');
      setDesc('');
      // You might want to clear the form or redirect the user
    } else {
      console.error('Failed to submit event');
    }
  };

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <h2>Create New Event</h2>
      <Description>
        <Name>Title:</Name>
        <Info
          type="text"
          placeholder="Enter text here"
          value={title}
          onChange={handleTitleChange}
        ></Info>
      </Description>
      <Description>
        <Name>Location:</Name>
        {/* <Autocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
        />
        ; */}
        <Info
          type="text"
          placeholder="Enter text here"
          value={location}
          onChange={handleLocationChange}
          // ref={ref}
        />
      </Description>

      {/* <Description>
        <Name>Phone:</Name>
        <Info
          type="text"
          placeholder="Enter text here"
          value={phone}
          onChange={handlePhoneChange}
        />
      </Description>

      <Description>
        <Name>Email:</Name>
        <Info
          type="text"
          placeholder="Enter text here"
          value={email}
          onChange={handleEmailChange}
        />
      </Description>
      */}
      <Description style={{ flexFlow: 'column', alignItems: 'start' }}>
        <Name>Description:</Name>
        <br />
        <InfoArea
          placeholder="Enter text here"
          value={description}
          onChange={handleDescriptionChange}
          rows={2}
        />
      </Description>
      <Submit
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </Submit>
    </Modal>
  );
};

export default UploadModal;
