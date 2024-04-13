'use client';

import Button from '@/components/Button';
import { useState } from 'react';
import { ReactFormState } from 'react-dom/client';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const Maker = styled.div`
  width: 500px;
  height: 500px;
  border: 2px solid white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const Name = styled.div`
  margin-right: 10px;
  padding: 12px;
  max-width: 100%;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Info = styled.input`
  width: 100%;
  height: 25px;
  padding: 12px;
  border: 1px solid white;
  cursor: pointer;
`;

const Submit = styled(Button)`
  // position: ;
  // bottom: 16px;
  width: 100%;
  margin: auto 0 0;
`;

const SkeletonInner = styled.div`
  flex: 1;
  padding: 1rem /* 16px */;
  background-color: rgb(24 24 27 / 0.8);
  border-radius: 1rem /* 16px */;
  max-width: 100%;
`;

const SkeletonImg = styled.div`
  height: 3.5rem /* 56px */;
  border-radius: 0.5rem /* 8px */;
  background-color: rgb(63 63 70 / 1);
`;

const SkeletonBtn = styled.span`
  padding: 6px;
  margin-top: rem /* 12px */;
  width: 50%;
  height: 10rem /* 12px */;
  border-radius: 10rem /* 8px */;
  background-color: rgb(255 0 128 / 1);
`;

const SkeletonLineOne = styled.div`
  margin-top: 0.75rem /* 12px */;
  height: 0.75rem /* 12px */;
  width: 91.666667%;
  border-radius: 0.5rem /* 8px */;
  background-color: rgb(63 63 70 / 1);
`;

const SkeletonLineTwo = styled.div`
  margin-top: 0.75rem /* 12px */;
  height: 0.75rem /* 12px */;
  width: 66.666667%;
  border-radius: 0.5rem /* 8px */;
  background-color: rgb(63 63 70 / 1);
`;

const Received = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  padding: 12px;
  margin-left: 100px;
  align-items: right;
  // <SkeletonInner>
  //   <SkeletonImg />
  //   <SkeletonBtn />
  //   <SkeletonLineOne />
  //   <SkeletonLineTwo />
  // </SkeletonInner>
`;

const Box = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDesc] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Container>
        <Maker>
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
            <Name>Name:</Name>
            <Info
              type="text"
              placeholder="Enter text here"
              value={name}
              onChange={handleNameChange}
            />
          </Description>

          <Description>
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

          <Description>
            <Name>Description:</Name>
            <Info
              type="text"
              placeholder="Enter text here"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Description>
          <Submit>Submit</Submit>
        </Maker>
        <InfoBox
          title={title}
          name={name}
          phone={phone}
          email={email}
          description={description}
        />
      </Container>
    </>
  );
};

const InfoBox = ({
  title,
  name,
  phone,
  email,
  description,
}: {
  title: string;
  name: string;
  phone: string;
  email: string;
  description: string;
}): JSX.Element => {
  return (
    <Received>
      <SkeletonInner>
        <SkeletonBtn>Title of Volunteering Opportunity</SkeletonBtn>
        <Name>Title: {title} </Name>
        <Name>Name: {name}</Name>
        <Name>Phone: {phone}</Name>
        <Name>Email: {email}</Name>
        <Name>Description: {description}</Name>
      </SkeletonInner>
    </Received>
  );
};

const Volunteer = (): JSX.Element => {
  const [seeBox, setSeeBox] = useState(false);

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>Volunteer Board</h1>
        <div>
          <Button
            onClick={() => {
              setSeeBox(!seeBox);
            }}
          >
            {seeBox ? '' : ''}
            Add Volunteer Opportunity
          </Button>
        </div>
        {seeBox && <Box />}
      </div>
    </>
  );
};

export default Volunteer;
