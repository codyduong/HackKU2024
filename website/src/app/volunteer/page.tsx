'use client';

import { useState } from 'react';
import styled from 'styled-components';

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, minmax(0, 1fr));
//   gap: 1.5rem /* 24px */;
// `;

// const SkeletonInner = styled.div`
//   padding: 1rem /* 16px */;
//   background-color: rgb(24 24 27 / 0.8);
//   border-radius: 1rem /* 16px */;
// `;

// const SkeletonImg = styled.div`
//   height: 3.5rem /* 56px */;
//   border-radius: 0.5rem /* 8px */;
//   background-color: rgb(63 63 70 / 1);
// `;

// const SkeletonBtn = styled.div`
//   margin-top: 0.75rem /* 12px */;
//   width: 25%;
//   height: 0.75rem /* 12px */;
//   border-radius: 0.5rem /* 8px */;
//   background-color: rgb(255 0 128 / 1);
// `;

// const SkeletonLineOne = styled.div`
//   margin-top: 0.75rem /* 12px */;
//   height: 0.75rem /* 12px */;
//   width: 91.666667%;
//   border-radius: 0.5rem /* 8px */;
//   background-color: rgb(63 63 70 / 1);
// `;

// const SkeletonLineTwo = styled.div`
//   margin-top: 0.75rem /* 12px */;
//   height: 0.75rem /* 12px */;
//   width: 66.666667%;
//   border-radius: 0.5rem /* 8px */;
//   background-color: rgb(63 63 70 / 1);
// `;

// const Skeleton = (): JSX.Element => (
//     <SkeletonInner>
//       <SkeletonImg />
//       <SkeletonBtn />
//       <SkeletonLineOne />
//       <SkeletonLineTwo />
//       {/* Add button to volunteer opportunity card */}
//     </SkeletonInner>
//   );

const Maker = styled.div`
  width: 500px;
  height: 500px;
  border: 2px solid white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Name = styled.div`
  margin-right: 10px;
`;

const Description = styled.div`
  margin-top: 10px;
`;

const Info = styled.input`
  width: 100%;
  height: 25px;
  padding: 10px;
  border: 1px solid white;
  cursor: pointer;
`;

const Button = styled.button`
  color: #9cc599;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #9cc599;
  border-radius: 3px;
  cursor: pointer;
`;

const Box = (): JSX.Element => (
  <Maker>
    <Row>
      <Name>Name:</Name>
      <Info type="text" placeholder="Enter text here" />
    </Row>
    <Description>
      <Name>Description:</Name>
      <Info type="text" placeholder="Enter text here" />
    </Description>
  </Maker>
);

const Volunteer = (): JSX.Element => {
  const [seeBox, setSeeBox] = useState(false);

  return (
    <>
      {/* <div
      // style={{
      //   position: 'absolute',
      //   width: '100vw',
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }}
      >
        {seeBox && <Box />}
      </div> */}
      <div>
        <h1 style={{ textAlign: 'center' }}>V/olunteer Board</h1>
        <div>
          <Button
            onClick={() => {
              setSeeBox(!seeBox);
            }}
          >
            {seeBox ? 'Hide' : 'Show'}
          </Button>
        </div>
        {seeBox && <Box />}
      </div>
    </>
  );
};

export default Volunteer;
