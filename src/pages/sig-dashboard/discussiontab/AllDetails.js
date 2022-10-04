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

function AllDetails({ sig_data }) {
  return (
    <DetailCards
      key={sig_data.sig_id}
      sigid={sig_data.sig_id}
      name={sig_data.sig_name}
      about={sig_data.sig_description}
      frequencyinterval={sig_data.sig_frequency_interval}
      meetingday={sig_data.sig_meeting_day}
      nextmeeting={sig_data.sig_next_meeting}
      starttime={sig_data.sig_start_time}
      endtime={sig_data.sig_end_time}
      // longeststreak={sig_data.longeststreak}
      // currentstreak={sig_data.currentstreak}
      updates={sig_data.sig_update_content}
    />
  );
}

export default AllDetails;

// need state for "There are no posts"
