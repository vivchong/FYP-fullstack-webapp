import moment from 'moment';
import DetailCards from '../../../components/sig-dashboard/DetailCards';

/*
AS DEFINED IN SIGDashboardPage.js

*/

function AllDetails({ sig_data, role }) {
const sig_next_meeting = moment(sig_data.sig_next_meeting).utc().format('Do MMMM YYYY')
  return (
    <DetailCards
      key={sig_data.sig_id}
      sigid={sig_data.sig_id}
      name={sig_data.sig_name}
      about={sig_data.sig_description}
      frequencyinterval={sig_data.sig_frequency_interval}
      meetingday={sig_data.sig_meeting_day}
      nextmeeting={sig_next_meeting}
      starttime={sig_data.sig_start_time}
      endtime={sig_data.sig_end_time}
      // longeststreak={sig_data.longeststreak}
      // currentstreak={sig_data.currentstreak}
      updates={sig_data.sig_update_content}
      role={role}
    />
  );
}

export default AllDetails;

// need state for "There are no posts"
