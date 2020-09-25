import funcMemory from '@/core/service/memory.service.js';

const auth = {
  checkAuth(url) {
    const role = funcMemory.getCookie('role');
    const level = funcMemory.getCookie('level');
    const userRole = `${role}`;
    const urlCheck = {
      Logged:[
        [ 'teamLeader' , 'manager', 'director', 'supervisor', 'staff' ], 'director', 'admin', 'hr'
      ],
      Employee:[
        'admin', 'hr'
      ],
      //Inside Page of Employee
      Department:[
        'admin', 'hr'
      ],
      Position:[
        [ 'teamLeader' , 'manager', 'director', 'supervisor' ], 'director', 'admin', 'hr'
      ],
      Project:[
        'admin', 'hr'
      ],
      OMProject:[
        'admin', 'hr'
      ],
      UpdateWkHour:[
        [ 'teamLeader' , 'manager', 'director', 'supervisor', 'staff' ], 'director', 'admin', 'hr'
      ],
      TotalRecord:[
        [ 'director', 'supervisor' ], 'admin', 'hr'
      ],
      Approve:[
        [ 'teamLeader' , 'manager', 'director', 'supervisor' ], 'director', 'admin', 'hr'
      ], 
      Error:[
        [ 'teamLeader' , 'manager', 'director', 'supervisor', 'staff' ], 'director', 'admin', 'hr'
      ],
    }
    //if user is staff
    if (urlCheck[url]) {
      if (userRole === 'staff') {
        //Check level of user
        const levelUser = urlCheck[url][0];
        //If level is admin or hr
        if (typeof levelUser === 'string' )  return false;
        //Else, if level is not admin or hr ==> get level
        const getLevelUser = levelUser.filter( item => item === level);
        return getLevelUser.length === 1 ? true : false
      } else { //if user not's staff
        const levelUser = urlCheck[url].filter( item => item === userRole);
        return levelUser.length === 1 ? true : false
      }
    }
  },
}
export default auth
