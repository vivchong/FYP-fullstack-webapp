import MemberItem from "./MemberItem";

function MemberList({members}) {
  return (
    <ul>
      {members.map(member => {
          return (
            <MemberItem
              key={member.user_id}
              name={member.user_display_name}
              pic={member.user_pic}
              role={member.role_id}
            />
          );
        }
      
        
        
      )}
    </ul>
  );
}

export default MemberList;
