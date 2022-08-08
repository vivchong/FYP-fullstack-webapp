import { Heading, Stack, Text } from '@chakra-ui/react';
import BaseCard from '../../../components/layout/cards/BaseCard';

import DetailCards from '../../../components/sig-dashboard/DetailCards';

/*
AS DEFINED IN SIGTabsDiscussion.js

const SIG_DETAILS = [
  {
    sigid: 1,
    signame: 'Computer Vision Buddies',
    sigdescription:
      "Welcome to Computer Vision Buddies! This is where we'll be sharing interesting readings in between meetings. Feel free to ask any questions related to computer vision here. \n\nWe meet every Friday at 6 PM. \n\nWhatsapp group: Link",
    sigfrequencyinterval: 'week',
    sigmeetingday: 'Friday',
    sigstarttime: '18:00',
    sigendtime: '19:00',
    longeststreak: 3,
    currentstreak: 1,
  },
];
*/

function AllDetails(props) {
  {
    /*props.details.map(detail => (
        <PostCard
          key={detail.sigid}
          name={detail.signame}
          description={detail.sigdescription}
          frequencyinterval={detail.sigfrequencyinterval}
          meetingday={detail.sigmeetingday}
          starttime={detail.sigstarttime}
          longeststreak={detail.longeststreak}
          currentstreak={detail.currentstreak}
        />
  ))*/
  }
  return (
    <>
      {props.details.map(detail => (
        <DetailCards
          sigid={detail.sigid}
          name={detail.signame}
          about={detail.sigdescription}
          frequencyinterval={detail.sigfrequencyinterval}
          meetingday={detail.sigmeetingday}
          starttime={detail.sigstarttime}
          endtime={detail.sigendtime}
          longeststreak={detail.longeststreak}
          currentstreak={detail.currentstreak}
          updates={detail.updates}
        />
      ))}
    </>
  );
}

export default AllDetails;

// need state for "There are no posts"
