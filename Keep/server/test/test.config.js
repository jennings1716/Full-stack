//  Test Configuration Object
const users = {
    user1: { username: 'jennings', password: 'jennings' },
    user1WithWrongPassword: { username: 'jennings', password: 'jen' },
    user2: { username: 'jennings1', password: 'jennings1' },
};

const userInfo = {
  user1: { username: 'jennings' }
};


const mockNotes = {
  noteOne: { 
              noteId:'1',title: 'title1', text: 'text1', state: 'not-started', userId: '5ca835833faf303184863f56',favorite : false,reminder:null,
              reminder_job:null,sharedTo:[]
           },
  noteTwo: { 
              noteId:'2',title: 'title2', text: 'text1', state: 'not-started', userId: '5cc2ef29ac459c58e03efb3d',favorite : false,reminder:null,
              reminder_job:null,sharedTo:[]
  }
}

module.exports = {
    users,
    mockNotes
};
