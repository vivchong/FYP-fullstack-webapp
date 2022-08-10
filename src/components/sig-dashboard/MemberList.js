import MemberItem from "./MemberItem";

/*
const MEMBERS = [
  {
    userid: 1,
    userdisplayname: 'Lim Yun Ting',
    userpic: '',
    role: 'Leader',
  },
  {
    userid: 2,
    userdisplayname: 'James Yap',
    userpic: '',
    role: 'Leader',
  },
  {
    userid: 3,
    userdisplayname: 'Alexis Yeoh',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 4,
    userdisplayname: 'Bernice Tan',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 5,
    userdisplayname: 'Charis Wee',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 6,
    userdisplayname: 'Cristal Ho',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 7,
    userdisplayname: 'David Wee',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 8,
    userdisplayname: 'Denise Tan',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 9,
    userdisplayname: 'Elton Lim',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 10,
    userdisplayname: 'Fenris Coom',
    userpic: '',
    role: 'Member',
  },
];
*/

function MemberList(props) {
  return (
    <ul>
      {props.members.map(member => (
        // Need to insert code here to check role. If
        // If not inserted here, then need to sort the object just before being sent to this function
        <MemberItem
          key={member.userid}
          name={member.userdisplayname}
          pic={member.userpic}
          role={member.role}
        />
      ))}
    </ul>
  );
}

export default MemberList;
