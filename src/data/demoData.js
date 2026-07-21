// demoData.js

export const students = [
  { id: 's1', name: 'Priya Sharma', email: 'priya.sharma@ghrcem.edu.in', avatar: 'PS', college: 'GHRCEM Jalgaon', branch: 'Computer Engineering', year: '4th', skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'], internScore: 92, status: 'active', currentInternship: 'int1', attendance: 95, milestonesCompleted: 8, totalMilestones: 10, joinedDate: '2026-01-15' },
  { id: 's2', name: 'Arjun Patil', email: 'arjun.patil@ghrcem.edu.in', avatar: 'AP', college: 'GHRCEM Jalgaon', branch: 'IT', year: '3rd', skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS'], internScore: 88, status: 'searching', currentInternship: null, attendance: 90, milestonesCompleted: 0, totalMilestones: 10, joinedDate: '2026-02-10' },
  { id: 's3', name: 'Sneha Deshmukh', email: 'sneha.deshmukh@ghrcem.edu.in', avatar: 'SD', college: 'GHRCEM Jalgaon', branch: 'E&TC', year: '4th', skills: ['C++', 'Embedded Systems', 'IoT', 'Arduino', 'Raspberry Pi'], internScore: 95, status: 'completed', currentInternship: 'int2', attendance: 98, milestonesCompleted: 10, totalMilestones: 10, joinedDate: '2025-08-01' },
  { id: 's4', name: 'Rahul Kulkarni', email: 'rahul.kulkarni@ghrcem.edu.in', avatar: 'RK', college: 'GHRCEM Jalgaon', branch: 'Mechanical', year: '3rd', skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'MATLAB', 'Manufacturing'], internScore: 85, status: 'active', currentInternship: 'int3', attendance: 92, milestonesCompleted: 5, totalMilestones: 10, joinedDate: '2026-03-01' },
  { id: 's5', name: 'Ananya Joshi', email: 'ananya.joshi@ghrcem.edu.in', avatar: 'AJ', college: 'GHRCEM Jalgaon', branch: 'Civil', year: '4th', skills: ['AutoCAD', 'Revit', 'Structural Analysis', 'STAAD.Pro', 'Surveying'], internScore: 89, status: 'searching', currentInternship: null, attendance: 94, milestonesCompleted: 0, totalMilestones: 10, joinedDate: '2026-01-20' },
  { id: 's6', name: 'Vikram Rathod', email: 'vikram.rathod@ghrcem.edu.in', avatar: 'VR', college: 'GHRCEM Jalgaon', branch: 'Computer Engineering', year: '3rd', skills: ['Java', 'Spring Boot', 'MySQL', 'Git', 'Jenkins'], internScore: 82, status: 'active', currentInternship: 'int4', attendance: 88, milestonesCompleted: 4, totalMilestones: 10, joinedDate: '2026-04-10' },
  { id: 's7', name: 'Pooja Wagh', email: 'pooja.wagh@ghrcem.edu.in', avatar: 'PW', college: 'GHRCEM Jalgaon', branch: 'IT', year: '4th', skills: ['JavaScript', 'Vue.js', 'Firebase', 'Figma', 'UI/UX'], internScore: 91, status: 'completed', currentInternship: 'int5', attendance: 96, milestonesCompleted: 10, totalMilestones: 10, joinedDate: '2025-09-15' },
  { id: 's8', name: 'Aditya Mahajan', email: 'aditya.mahajan@ghrcem.edu.in', avatar: 'AM', college: 'GHRCEM Jalgaon', branch: 'E&TC', year: '3rd', skills: ['VHDL', 'Verilog', 'VLSI', 'Signal Processing', 'C'], internScore: 78, status: 'searching', currentInternship: null, attendance: 85, milestonesCompleted: 0, totalMilestones: 10, joinedDate: '2026-02-28' },
  { id: 's9', name: 'Kavita Chaudhari', email: 'kavita.chaudhari@ghrcem.edu.in', avatar: 'KC', college: 'GHRCEM Jalgaon', branch: 'Computer Engineering', year: '4th', skills: ['Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-Learn'], internScore: 94, status: 'active', currentInternship: 'int6', attendance: 97, milestonesCompleted: 9, totalMilestones: 10, joinedDate: '2026-01-05' },
  { id: 's10', name: 'Rohit Pawar', email: 'rohit.pawar@ghrcem.edu.in', avatar: 'RP', college: 'GHRCEM Jalgaon', branch: 'Mechanical', year: '4th', skills: ['Thermodynamics', 'Fluid Mechanics', 'CAD', 'CAM', 'Robotics'], internScore: 86, status: 'completed', currentInternship: 'int7', attendance: 91, milestonesCompleted: 10, totalMilestones: 10, joinedDate: '2025-10-10' },
  { id: 's11', name: 'Neha Gaikwad', email: 'neha.gaikwad@ghrcem.edu.in', avatar: 'NG', college: 'GHRCEM Jalgaon', branch: 'IT', year: '3rd', skills: ['C#', '.NET', 'SQL Server', 'Azure', 'Agile'], internScore: 81, status: 'active', currentInternship: 'int8', attendance: 89, milestonesCompleted: 3, totalMilestones: 10, joinedDate: '2026-05-01' },
  { id: 's12', name: 'Saurabh More', email: 'saurabh.more@ghrcem.edu.in', avatar: 'SM', college: 'GHRCEM Jalgaon', branch: 'Computer Engineering', year: '4th', skills: ['Go', 'Kubernetes', 'Microservices', 'Linux', 'Bash'], internScore: 93, status: 'active', currentInternship: 'int9', attendance: 95, milestonesCompleted: 7, totalMilestones: 10, joinedDate: '2026-02-15' },
  { id: 's13', name: 'Divya Bhosale', email: 'divya.bhosale@ghrcem.edu.in', avatar: 'DB', college: 'GHRCEM Jalgaon', branch: 'Civil', year: '3rd', skills: ['Construction Management', 'Estimation', 'AutoCAD', 'QGIS', 'Concrete Technology'], internScore: 79, status: 'searching', currentInternship: null, attendance: 86, milestonesCompleted: 0, totalMilestones: 10, joinedDate: '2026-03-15' },
  { id: 's14', name: 'Akash Sonawane', email: 'akash.sonawane@ghrcem.edu.in', avatar: 'AS', college: 'GHRCEM Jalgaon', branch: 'E&TC', year: '4th', skills: ['Networking', 'CCNA', 'Cybersecurity', 'Wireshark', 'Linux'], internScore: 87, status: 'completed', currentInternship: 'int10', attendance: 93, milestonesCompleted: 10, totalMilestones: 10, joinedDate: '2025-11-20' },
  { id: 's15', name: 'Mansi Jadhav', email: 'mansi.jadhav@ghrcem.edu.in', avatar: 'MJ', college: 'GHRCEM Jalgaon', branch: 'Computer Engineering', year: '3rd', skills: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'], internScore: 84, status: 'active', currentInternship: 'int11', attendance: 90, milestonesCompleted: 6, totalMilestones: 10, joinedDate: '2026-04-05' },
];

export const facultyMentors = [
  { id: 'f1', name: 'Dr. Vivek Deshpande', email: 'vivek.deshpande@ghrcem.edu.in', department: 'Computer Engineering', designation: 'Professor', specialization: 'Artificial Intelligence', studentsAssigned: ['s1', 's9', 's12'], rating: 4.8 },
  { id: 'f2', name: 'Prof. Anjali Kadam', email: 'anjali.kadam@ghrcem.edu.in', department: 'IT', designation: 'Assistant Professor', specialization: 'Cloud Computing', studentsAssigned: ['s2', 's7', 's11'], rating: 4.6 },
  { id: 'f3', name: 'Dr. Ramesh Rathi', email: 'ramesh.rathi@ghrcem.edu.in', department: 'E&TC', designation: 'Associate Professor', specialization: 'Embedded Systems', studentsAssigned: ['s3', 's8', 's14'], rating: 4.7 },
  { id: 'f4', name: 'Prof. Sanjay Patil', email: 'sanjay.patil@ghrcem.edu.in', department: 'Mechanical', designation: 'Professor', specialization: 'Thermal Engineering', studentsAssigned: ['s4', 's10'], rating: 4.5 },
  { id: 'f5', name: 'Dr. Meena Shinde', email: 'meena.shinde@ghrcem.edu.in', department: 'Civil', designation: 'Associate Professor', specialization: 'Structural Engineering', studentsAssigned: ['s5', 's13'], rating: 4.9 },
  { id: 'f6', name: 'Prof. Kiran Ahire', email: 'kiran.ahire@ghrcem.edu.in', department: 'Computer Engineering', designation: 'Assistant Professor', specialization: 'Cyber Security', studentsAssigned: ['s6', 's15'], rating: 4.4 },
];

export const companies = [
  { id: 'c1', name: 'TCS', logo: '🏢', industry: 'IT Services', size: '100,000+', location: 'Pune', internsCount: 50, rating: 4.2, ppoRate: 75, description: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company.' },
  { id: 'c2', name: 'Infosys', logo: '🌐', industry: 'IT Services', size: '100,000+', location: 'Pune', internsCount: 45, rating: 4.1, ppoRate: 70, description: 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.' },
  { id: 'c3', name: 'Wipro', logo: '💻', industry: 'IT Services', size: '100,000+', location: 'Pune', internsCount: 40, rating: 4.0, ppoRate: 68, description: 'Wipro Limited is an Indian multinational corporation that provides information technology, consulting and business process services.' },
  { id: 'c4', name: 'Persistent Systems', logo: '🚀', industry: 'Software Product Engineering', size: '10,000+', location: 'Pune', internsCount: 30, rating: 4.5, ppoRate: 85, description: 'Persistent Systems is a multinational technology company specializing in software product development services.' },
  { id: 'c5', name: 'Jio', logo: '📱', industry: 'Telecommunications', size: '10,000+', location: 'Mumbai', internsCount: 25, rating: 4.3, ppoRate: 80, description: 'Reliance Jio Infocomm Limited is an Indian telecommunications company and a subsidiary of Jio Platforms.' },
  { id: 'c6', name: 'Flipkart', logo: '🛒', industry: 'E-commerce', size: '10,000+', location: 'Bengaluru', internsCount: 20, rating: 4.6, ppoRate: 90, description: 'Flipkart is an Indian e-commerce company, headquartered in Bangalore, Karnataka, India.' },
  { id: 'c7', name: 'Zomato', logo: '🍕', industry: 'Food Delivery', size: '5,000+', location: 'Gurgaon', internsCount: 15, rating: 4.4, ppoRate: 82, description: 'Zomato is an Indian multinational restaurant aggregator and food delivery company.' },
  { id: 'c8', name: 'Razorpay', logo: '💳', industry: 'Fintech', size: '1,000+', location: 'Bengaluru', internsCount: 10, rating: 4.7, ppoRate: 95, description: 'Razorpay is an Indian payment solution company that allows businesses to accept, process, and disburse payments.' },
  { id: 'c9', name: 'Zerodha', logo: '📈', industry: 'Fintech', size: '1,000+', location: 'Bengaluru', internsCount: 5, rating: 4.8, ppoRate: 98, description: 'Zerodha Broking Ltd is an Indian financial services company that offers retail and institutional broking.' },
  { id: 'c10', name: 'PhonePe', logo: '💸', industry: 'Fintech', size: '5,000+', location: 'Bengaluru', internsCount: 12, rating: 4.5, ppoRate: 88, description: 'PhonePe is an Indian digital payments and financial services company.' },
];

export const internships = [
  { id: 'int1', companyId: 'c1', title: 'React Developer Intern', domain: 'Web Development', skills: ['React', 'JavaScript', 'HTML/CSS'], duration: '6 months', stipend: '₹15,000/month', location: 'Pune', status: 'active', applicants: 120, positions: 5, postedDate: '2025-12-01', deadline: '2025-12-31', description: 'Join our team as a React Developer Intern and work on enterprise applications.' },
  { id: 'int2', companyId: 'c4', title: 'Python Backend Intern', domain: 'Backend Development', skills: ['Python', 'Django', 'SQL'], duration: '6 months', stipend: '₹20,000/month', location: 'Pune', status: 'completed', applicants: 85, positions: 3, postedDate: '2025-07-01', deadline: '2025-07-25', description: 'Help us build robust backend systems using Python and Django.' },
  { id: 'int3', companyId: 'c2', title: 'Data Science Intern', domain: 'Data Science', skills: ['Machine Learning', 'Python', 'SQL'], duration: '6 months', stipend: '₹25,000/month', location: 'Pune', status: 'active', applicants: 150, positions: 2, postedDate: '2026-01-15', deadline: '2026-02-15', description: 'Apply machine learning techniques to solve real-world business problems.' },
  { id: 'int4', companyId: 'c8', title: 'Software Engineering Intern', domain: 'Software Engineering', skills: ['Java', 'Spring', 'MySQL'], duration: '3 months', stipend: '₹30,000/month', location: 'Bengaluru (Remote)', status: 'active', applicants: 200, positions: 4, postedDate: '2026-03-01', deadline: '2026-03-20', description: 'Work with the core engineering team on payment gateway integration.' },
  { id: 'int5', companyId: 'c6', title: 'Frontend Developer Intern', domain: 'Web Development', skills: ['Vue.js', 'JavaScript', 'CSS'], duration: '6 months', stipend: '₹25,000/month', location: 'Bengaluru', status: 'completed', applicants: 110, positions: 3, postedDate: '2025-08-10', deadline: '2025-08-30', description: 'Create responsive and dynamic user interfaces for our e-commerce platform.' },
  { id: 'int6', companyId: 'c5', title: 'IoT Engineer Intern', domain: 'Embedded Systems', skills: ['C++', 'IoT', 'Arduino'], duration: '6 months', stipend: '₹18,000/month', location: 'Mumbai', status: 'active', applicants: 60, positions: 2, postedDate: '2025-12-15', deadline: '2026-01-10', description: 'Develop and test IoT devices and applications.' },
  { id: 'int7', companyId: 'c7', title: 'Mobile App Developer Intern', domain: 'App Development', skills: ['React Native', 'JavaScript', 'Firebase'], duration: '6 months', stipend: '₹22,000/month', location: 'Gurgaon', status: 'completed', applicants: 130, positions: 3, postedDate: '2025-09-01', deadline: '2025-09-20', description: 'Build and maintain features for our popular food delivery app.' },
  { id: 'int8', companyId: 'c9', title: 'Cloud DevOps Intern', domain: 'DevOps', skills: ['AWS', 'Docker', 'Linux'], duration: '6 months', stipend: '₹35,000/month', location: 'Bengaluru', status: 'active', applicants: 90, positions: 1, postedDate: '2026-04-01', deadline: '2026-04-25', description: 'Automate infrastructure and deployment pipelines in AWS.' },
  { id: 'int9', companyId: 'c3', title: 'Cybersecurity Intern', domain: 'Security', skills: ['Networking', 'Linux', 'Ethical Hacking'], duration: '3 months', stipend: '₹15,000/month', location: 'Pune', status: 'active', applicants: 75, positions: 2, postedDate: '2026-01-10', deadline: '2026-01-30', description: 'Assist in vulnerability assessment and penetration testing.' },
  { id: 'int10', companyId: 'c10', title: 'Backend SDE Intern', domain: 'Backend Development', skills: ['Go', 'Microservices', 'PostgreSQL'], duration: '6 months', stipend: '₹30,000/month', location: 'Bengaluru', status: 'completed', applicants: 180, positions: 4, postedDate: '2025-10-01', deadline: '2025-10-25', description: 'Design and develop scalable microservices in Go.' },
  { id: 'int11', companyId: 'c1', title: 'UI/UX Design Intern', domain: 'Design', skills: ['Figma', 'Adobe XD', 'Prototyping'], duration: '3 months', stipend: '₹12,000/month', location: 'Pune', status: 'active', applicants: 100, positions: 2, postedDate: '2026-03-15', deadline: '2026-04-05', description: 'Design user-centric interfaces and create interactive prototypes.' },
  { id: 'int12', companyId: 'c4', title: 'QA Automation Intern', domain: 'Testing', skills: ['Selenium', 'Java', 'TestNG'], duration: '6 months', stipend: '₹16,000/month', location: 'Pune', status: 'open', applicants: 50, positions: 3, postedDate: '2026-07-01', deadline: '2026-07-30', description: 'Write and maintain automated test scripts for enterprise software.' },
];

export const applications = [
  { id: 'app1', studentId: 's1', internshipId: 'int1', status: 'accepted', appliedDate: '2025-12-10', matchScore: 92 },
  { id: 'app2', studentId: 's2', internshipId: 'int2', status: 'rejected', appliedDate: '2025-07-15', matchScore: 78 },
  { id: 'app3', studentId: 's3', internshipId: 'int6', status: 'accepted', appliedDate: '2025-12-20', matchScore: 88 },
  { id: 'app4', studentId: 's4', internshipId: 'int3', status: 'accepted', appliedDate: '2026-01-25', matchScore: 85 },
  { id: 'app5', studentId: 's5', internshipId: 'int12', status: 'pending', appliedDate: '2026-07-10', matchScore: 75 },
  { id: 'app6', studentId: 's6', internshipId: 'int4', status: 'accepted', appliedDate: '2026-03-10', matchScore: 82 },
  { id: 'app7', studentId: 's7', internshipId: 'int5', status: 'accepted', appliedDate: '2025-08-15', matchScore: 95 },
  { id: 'app8', studentId: 's8', internshipId: 'int6', status: 'rejected', appliedDate: '2025-12-25', matchScore: 65 },
  { id: 'app9', studentId: 's9', internshipId: 'int3', status: 'accepted', appliedDate: '2026-01-20', matchScore: 94 },
  { id: 'app10', studentId: 's10', internshipId: 'int12', status: 'pending', appliedDate: '2026-07-12', matchScore: 70 },
  { id: 'app11', studentId: 's11', internshipId: 'int8', status: 'accepted', appliedDate: '2026-04-10', matchScore: 80 },
  { id: 'app12', studentId: 's12', internshipId: 'int10', status: 'accepted', appliedDate: '2025-10-15', matchScore: 90 },
  { id: 'app13', studentId: 's13', internshipId: 'int12', status: 'pending', appliedDate: '2026-07-14', matchScore: 68 },
  { id: 'app14', studentId: 's14', internshipId: 'int9', status: 'accepted', appliedDate: '2026-01-15', matchScore: 86 },
  { id: 'app15', studentId: 's15', internshipId: 'int11', status: 'accepted', appliedDate: '2026-03-25', matchScore: 84 },
  { id: 'app16', studentId: 's2', internshipId: 'int4', status: 'rejected', appliedDate: '2026-03-12', matchScore: 72 },
  { id: 'app17', studentId: 's5', internshipId: 'int5', status: 'rejected', appliedDate: '2025-08-20', matchScore: 60 },
  { id: 'app18', studentId: 's8', internshipId: 'int9', status: 'rejected', appliedDate: '2026-01-18', matchScore: 74 },
  { id: 'app19', studentId: 's13', internshipId: 'int7', status: 'rejected', appliedDate: '2025-09-10', matchScore: 62 },
  { id: 'app20', studentId: 's2', internshipId: 'int8', status: 'rejected', appliedDate: '2026-04-15', matchScore: 76 },
];

export const evaluations = [
  { id: 'ev1', studentId: 's1', evaluatorId: 'f1', evaluatorType: 'faculty', technical: 9, communication: 8, teamwork: 9, initiative: 8, professionalism: 9, overallRating: 8.6, feedback: 'Excellent technical skills, needs slight improvement in communication.', date: '2026-04-15', type: 'midterm' },
  { id: 'ev2', studentId: 's3', evaluatorId: 'c5', evaluatorType: 'industry', technical: 10, communication: 9, teamwork: 10, initiative: 9, professionalism: 10, overallRating: 9.6, feedback: 'Outstanding performance, completed the project ahead of schedule.', date: '2026-01-20', type: 'final' },
  { id: 'ev3', studentId: 's4', evaluatorId: 'f4', evaluatorType: 'faculty', technical: 8, communication: 7, teamwork: 8, initiative: 8, professionalism: 8, overallRating: 7.8, feedback: 'Good progress, needs to be more proactive in weekly meetings.', date: '2026-05-10', type: 'midterm' },
  { id: 'ev4', studentId: 's6', evaluatorId: 'c8', evaluatorType: 'industry', technical: 7, communication: 8, teamwork: 9, initiative: 7, professionalism: 8, overallRating: 7.8, feedback: 'Good team player, technical skills are improving steadily.', date: '2026-06-05', type: 'midterm' },
  { id: 'ev5', studentId: 's7', evaluatorId: 'f2', evaluatorType: 'faculty', technical: 9, communication: 9, teamwork: 9, initiative: 9, professionalism: 9, overallRating: 9.0, feedback: 'Very consistent and dedicated student.', date: '2026-02-15', type: 'final' },
  { id: 'ev6', studentId: 's9', evaluatorId: 'c2', evaluatorType: 'industry', technical: 9, communication: 8, teamwork: 8, initiative: 9, professionalism: 9, overallRating: 8.6, feedback: 'Quick learner, contributed valuable insights to the data model.', date: '2026-04-20', type: 'midterm' },
  { id: 'ev7', studentId: 's10', evaluatorId: 'f4', evaluatorType: 'faculty', technical: 8, communication: 8, teamwork: 8, initiative: 8, professionalism: 9, overallRating: 8.2, feedback: 'Solid performance throughout the internship period.', date: '2026-03-25', type: 'final' },
  { id: 'ev8', studentId: 's11', evaluatorId: 'c9', evaluatorType: 'industry', technical: 8, communication: 7, teamwork: 8, initiative: 8, professionalism: 8, overallRating: 7.8, feedback: 'Good understanding of AWS concepts, practical application is getting better.', date: '2026-06-15', type: 'midterm' },
  { id: 'ev9', studentId: 's12', evaluatorId: 'f1', evaluatorType: 'faculty', technical: 9, communication: 9, teamwork: 8, initiative: 9, professionalism: 9, overallRating: 8.8, feedback: 'Excellent grasp of backend architectures.', date: '2026-05-20', type: 'midterm' },
  { id: 'ev10', studentId: 's14', evaluatorId: 'c3', evaluatorType: 'industry', technical: 8, communication: 8, teamwork: 9, initiative: 8, professionalism: 9, overallRating: 8.4, feedback: 'Very professional, communicates issues clearly.', date: '2026-04-10', type: 'midterm' },
];

export const milestones = [
  { id: 'm1', studentId: 's1', internshipId: 'int1', title: 'Project Setup & Environment', description: 'Initialize React app, setup linting, formatters, and folder structure.', status: 'completed', dueDate: '2026-01-31', completedDate: '2026-01-25', progress: 100 },
  { id: 'm2', studentId: 's1', internshipId: 'int1', title: 'Component Library Integration', description: 'Integrate Tailwind CSS and basic UI components.', status: 'completed', dueDate: '2026-02-15', completedDate: '2026-02-14', progress: 100 },
  { id: 'm3', studentId: 's1', internshipId: 'int1', title: 'Authentication Flow', description: 'Implement login and registration UI with API integration.', status: 'in_progress', dueDate: '2026-03-15', completedDate: null, progress: 60 },
  { id: 'm4', studentId: 's3', internshipId: 'int6', title: 'Hardware Selection', description: 'Select appropriate microcontroller and sensors for the project.', status: 'completed', dueDate: '2025-08-31', completedDate: '2025-08-28', progress: 100 },
  { id: 'm5', studentId: 's3', internshipId: 'int6', title: 'Sensor Integration', description: 'Interface sensors with the microcontroller and read data.', status: 'completed', dueDate: '2025-09-30', completedDate: '2025-09-25', progress: 100 },
  { id: 'm6', studentId: 's4', internshipId: 'int3', title: 'Data Cleaning', description: 'Clean and preprocess the initial dataset for the model.', status: 'completed', dueDate: '2026-03-31', completedDate: '2026-03-29', progress: 100 },
  { id: 'm7', studentId: 's4', internshipId: 'int3', title: 'EDA', description: 'Perform Exploratory Data Analysis and visualize key trends.', status: 'completed', dueDate: '2026-04-15', completedDate: '2026-04-12', progress: 100 },
  { id: 'm8', studentId: 's6', internshipId: 'int4', title: 'API Endpoints Design', description: 'Design REST API endpoints for the transaction module.', status: 'completed', dueDate: '2026-03-31', completedDate: '2026-03-30', progress: 100 },
  { id: 'm9', studentId: 's6', internshipId: 'int4', title: 'Database Schema', description: 'Design database schema for storing transaction records.', status: 'completed', dueDate: '2026-04-15', completedDate: '2026-04-14', progress: 100 },
  { id: 'm10', studentId: 's9', internshipId: 'int3', title: 'Model Selection', description: 'Evaluate different ML algorithms for the prediction task.', status: 'completed', dueDate: '2026-03-15', completedDate: '2026-03-10', progress: 100 },
  { id: 'm11', studentId: 's9', internshipId: 'int3', title: 'Model Training', description: 'Train the selected model with hyperparameter tuning.', status: 'in_progress', dueDate: '2026-04-15', completedDate: null, progress: 80 },
  { id: 'm12', studentId: 's11', internshipId: 'int8', title: 'AWS Account Setup', description: 'Configure AWS IAM roles, VPC, and basic security groups.', status: 'completed', dueDate: '2026-05-15', completedDate: '2026-05-10', progress: 100 },
  { id: 'm13', studentId: 's11', internshipId: 'int8', title: 'Dockerization', description: 'Create Dockerfiles for frontend and backend services.', status: 'in_progress', dueDate: '2026-06-15', completedDate: null, progress: 50 },
  { id: 'm14', studentId: 's12', internshipId: 'int10', title: 'Microservice Architecture Design', description: 'Design the communication flow between Go microservices.', status: 'completed', dueDate: '2026-03-15', completedDate: '2026-03-12', progress: 100 },
  { id: 'm15', studentId: 's15', internshipId: 'int11', title: 'Wireframing', description: 'Create low-fidelity wireframes for the core application screens.', status: 'completed', dueDate: '2026-04-30', completedDate: '2026-04-28', progress: 100 },
];

export const attendanceRecords = [
  { id: 'at1', studentId: 's1', date: '2026-07-01', checkInTime: '09:00 AM', checkOutTime: '06:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at2', studentId: 's1', date: '2026-07-02', checkInTime: '09:15 AM', checkOutTime: '06:10 PM', status: 'present', location: 'Pune Office' },
  { id: 'at3', studentId: 's1', date: '2026-07-03', checkInTime: '09:05 AM', checkOutTime: '06:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at4', studentId: 's4', date: '2026-07-01', checkInTime: '10:00 AM', checkOutTime: '07:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at5', studentId: 's4', date: '2026-07-02', checkInTime: '10:10 AM', checkOutTime: '07:05 PM', status: 'present', location: 'Pune Office' },
  { id: 'at6', studentId: 's4', date: '2026-07-03', checkInTime: '10:00 AM', checkOutTime: null, status: 'absent', location: null },
  { id: 'at7', studentId: 's6', date: '2026-07-01', checkInTime: '09:30 AM', checkOutTime: '06:30 PM', status: 'present', location: 'Remote' },
  { id: 'at8', studentId: 's6', date: '2026-07-02', checkInTime: '09:35 AM', checkOutTime: '06:40 PM', status: 'present', location: 'Remote' },
  { id: 'at9', studentId: 's6', date: '2026-07-03', checkInTime: '09:25 AM', checkOutTime: '06:30 PM', status: 'present', location: 'Remote' },
  { id: 'at10', studentId: 's9', date: '2026-07-01', checkInTime: '09:00 AM', checkOutTime: '05:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at11', studentId: 's9', date: '2026-07-02', checkInTime: '08:55 AM', checkOutTime: '05:10 PM', status: 'present', location: 'Pune Office' },
  { id: 'at12', studentId: 's9', date: '2026-07-03', checkInTime: '09:05 AM', checkOutTime: '05:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at13', studentId: 's11', date: '2026-07-01', checkInTime: '09:00 AM', checkOutTime: '06:00 PM', status: 'present', location: 'Bengaluru Office' },
  { id: 'at14', studentId: 's11', date: '2026-07-02', checkInTime: '09:10 AM', checkOutTime: '06:05 PM', status: 'present', location: 'Bengaluru Office' },
  { id: 'at15', studentId: 's11', date: '2026-07-03', checkInTime: '09:00 AM', checkOutTime: '06:15 PM', status: 'present', location: 'Bengaluru Office' },
  { id: 'at16', studentId: 's12', date: '2026-07-01', checkInTime: '09:30 AM', checkOutTime: '06:30 PM', status: 'present', location: 'Pune Office' },
  { id: 'at17', studentId: 's12', date: '2026-07-02', checkInTime: '09:25 AM', checkOutTime: '06:20 PM', status: 'present', location: 'Pune Office' },
  { id: 'at18', studentId: 's12', date: '2026-07-03', checkInTime: '09:30 AM', checkOutTime: '06:30 PM', status: 'present', location: 'Pune Office' },
  { id: 'at19', studentId: 's14', date: '2026-07-01', checkInTime: '10:00 AM', checkOutTime: '06:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at20', studentId: 's14', date: '2026-07-02', checkInTime: '10:05 AM', checkOutTime: '06:10 PM', status: 'present', location: 'Pune Office' },
  { id: 'at21', studentId: 's14', date: '2026-07-03', checkInTime: '10:00 AM', checkOutTime: '06:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at22', studentId: 's15', date: '2026-07-01', checkInTime: '09:00 AM', checkOutTime: '05:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at23', studentId: 's15', date: '2026-07-02', checkInTime: '08:50 AM', checkOutTime: '05:05 PM', status: 'present', location: 'Pune Office' },
  { id: 'at24', studentId: 's15', date: '2026-07-03', checkInTime: '09:05 AM', checkOutTime: '05:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at25', studentId: 's1', date: '2026-07-04', checkInTime: '09:00 AM', checkOutTime: '06:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at26', studentId: 's4', date: '2026-07-04', checkInTime: '10:00 AM', checkOutTime: '07:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at27', studentId: 's6', date: '2026-07-04', checkInTime: '09:30 AM', checkOutTime: '06:30 PM', status: 'present', location: 'Remote' },
  { id: 'at28', studentId: 's9', date: '2026-07-04', checkInTime: '09:00 AM', checkOutTime: '05:00 PM', status: 'present', location: 'Pune Office' },
  { id: 'at29', studentId: 's11', date: '2026-07-04', checkInTime: null, checkOutTime: null, status: 'leave', location: null },
  { id: 'at30', studentId: 's12', date: '2026-07-04', checkInTime: '09:30 AM', checkOutTime: '06:30 PM', status: 'present', location: 'Pune Office' },
];

export const certificates = [
  { id: 'cert1', studentId: 's3', internshipId: 'int6', title: 'Certificate of Internship Completion - Embedded Systems Engineer', issuedDate: '2026-01-15', hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z', verified: true, skills: ['C++', 'IoT', 'Arduino', 'Sensor Integration'] },
  { id: 'cert2', studentId: 's7', internshipId: 'int5', title: 'Certificate of Internship Completion - Frontend Developer', issuedDate: '2026-02-05', hash: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a', verified: true, skills: ['Vue.js', 'JavaScript', 'CSS', 'Responsive Design'] },
  { id: 'cert3', studentId: 's10', internshipId: 'int7', title: 'Certificate of Internship Completion - Mobile App Developer', issuedDate: '2026-03-25', hash: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b', verified: true, skills: ['React Native', 'JavaScript', 'Firebase', 'Mobile UI'] },
  { id: 'cert4', studentId: 's14', internshipId: 'int9', title: 'Certificate of Internship Completion - Backend SDE', issuedDate: '2026-04-10', hash: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c', verified: true, skills: ['Go', 'Microservices', 'PostgreSQL', 'API Design'] },
  { id: 'cert5', studentId: 's2', internshipId: 'int2', title: 'Certificate of Internship Completion - Python Backend', issuedDate: '2026-01-30', hash: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d', verified: true, skills: ['Python', 'Django', 'SQL', 'Backend Architecture'] },
];

export const notifications = [
  { id: 'n1', userId: 's1', type: 'milestone', title: 'Milestone Approved', message: 'Your milestone "Project Setup & Environment" has been approved by your mentor.', read: true, timestamp: '2026-01-26T10:00:00Z' },
  { id: 'n2', userId: 's1', type: 'evaluation', title: 'New Evaluation Available', message: 'Your midterm evaluation is now available for review.', read: false, timestamp: '2026-04-16T14:30:00Z' },
  { id: 'n3', userId: 's2', type: 'application', title: 'Application Update', message: 'Your application for Python Backend Intern at Persistent Systems has been rejected.', read: true, timestamp: '2025-07-20T09:15:00Z' },
  { id: 'n4', userId: 's4', type: 'attendance', title: 'Attendance Marked', message: 'Your absence for 2026-07-03 has been recorded.', read: false, timestamp: '2026-07-03T18:00:00Z' },
  { id: 'n5', userId: 's5', type: 'system', title: 'Welcome to Internova!', message: 'Complete your profile to get the best internship recommendations.', read: true, timestamp: '2026-01-20T08:00:00Z' },
  { id: 'n6', userId: 'f1', type: 'milestone', title: 'Milestone Review Required', message: 'Priya Sharma has submitted milestone "Authentication Flow" for review.', read: false, timestamp: '2026-03-16T11:20:00Z' },
  { id: 'n7', userId: 'f1', type: 'evaluation', title: 'Evaluation Reminder', message: 'Please submit the final evaluation for Saurabh More by next Friday.', read: false, timestamp: '2026-07-15T09:00:00Z' },
  { id: 'n8', userId: 'c1', type: 'application', title: 'New Applications Received', message: 'You have 5 new applications for the React Developer Intern position.', read: true, timestamp: '2025-12-11T16:45:00Z' },
  { id: 'n9', userId: 'c4', type: 'milestone', title: 'Intern Progress Update', message: 'Sneha Deshmukh has completed the milestone "Sensor Integration".', read: true, timestamp: '2025-09-26T10:10:00Z' },
  { id: 'n10', userId: 's11', type: 'certificate', title: 'Certificate Issued', message: 'Congratulations! Your internship completion certificate has been issued.', read: false, timestamp: '2026-07-20T12:00:00Z' },
];

export const startupIdeas = [
  { id: 'idea1', studentId: 's1', title: 'EduTech Platform for Regional Languages', description: 'A platform providing technical courses in Marathi, Hindi, and other regional languages.', stage: 'Prototype', mentorId: 'f1', domain: 'EdTech', createdDate: '2026-02-10' },
  { id: 'idea2', studentId: 's3', title: 'Smart Agriculture IoT System', description: 'IoT-based soil monitoring and automated irrigation system for local farmers.', stage: 'Development', mentorId: 'f3', domain: 'AgriTech', createdDate: '2025-10-15' },
  { id: 'idea3', studentId: 's7', title: 'Local Artisan E-commerce Marketplace', description: 'An e-commerce platform dedicated to connecting local artisans directly with consumers.', stage: 'Ideation', mentorId: 'f2', domain: 'E-commerce', createdDate: '2026-05-20' },
  { id: 'idea4', studentId: 's10', title: 'AI-Powered Resume Analyzer', description: 'A tool that uses NLP to analyze resumes against job descriptions and suggest improvements.', stage: 'MVP', mentorId: 'f6', domain: 'HR Tech', createdDate: '2026-04-05' },
];

export const skillCategories = {
  'Web Development': ['React', 'Node.js', 'Vue.js', 'Angular', 'HTML/CSS', 'JavaScript', 'TypeScript', 'Express', 'PHP', 'Laravel'],
  'Backend Development': ['Python', 'Django', 'Java', 'Spring Boot', 'Go', 'Microservices', 'PostgreSQL', 'MySQL', 'MongoDB'],
  'Data Science & AI': ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-Learn', 'Data Visualization'],
  'Mobile Development': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Android', 'iOS'],
  'Cloud & DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Linux', 'Bash'],
  'Core Engineering': ['AutoCAD', 'SolidWorks', 'ANSYS', 'MATLAB', 'VHDL', 'Verilog', 'IoT', 'Embedded Systems', 'C++', 'C'],
  'Design & UI/UX': ['Figma', 'Adobe XD', 'Sketch', 'UI/UX Design', 'Prototyping', 'Wireframing'],
  'Security & Networking': ['Cybersecurity', 'Ethical Hacking', 'Networking', 'CCNA', 'Wireshark', 'Cryptography']
};

export const analyticsData = {
  totalStudents: 2547,
  totalCompanies: 156,
  totalInternships: 89,
  activeInterns: 342,
  placementRate: 94,
  avgInternScore: 87,
  monthlyAttendance: [88, 91, 85, 93, 90, 92],
  skillDistribution: {
    'Web Development': 45,
    'Data Science & AI': 25,
    'Core Engineering': 15,
    'Cloud & DevOps': 10,
    'Mobile Development': 5
  },
  departmentWise: {
    'Computer Engineering': 850,
    'IT': 600,
    'E&TC': 500,
    'Mechanical': 350,
    'Civil': 247
  }
};
