const data = {
	profile: {
		id: 'M332R6346',
		name: 'Yusuf Sugiono',
		photo: 'assets/profile.jpg',
		university: 'Universitas Trunojoyo',
		email: 'm332r6346[at]dicoding.org',
		lecturer: 'Sri Herawati, S.Kom., M.Kom.',
		dedicated_mentor: 'Deti Anggraini Ekawati',
		expert_mentor:[
			'Tia Dwi Setiani',
			'Zanuar Ekaputra Rus\'an',
			'Dimas Maulana Dwi Saputra',
			'Rully Indra Laelaningrum',
		],
	},
	attendance: [
		{
			session: 'Sesi Onboarding Nasional (23 Agustus 2021)',
			attending: true,
		},
		{
			session: 'Sesi Tech-Briefing Dicoding (23 Agustus 2021)',
			attending: true,
		},
		{
			session: 'Sesi Onboarding Nasional 2 Kemdikbudristek (28 Agustus 2021)',
			attending: false,
		},
	],
	course_progress: [
		{
			course: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
			percentage: 100,
			completed: true,
		},
		{
			course: 'Pengenalan ke Logika Pemrograman (Programming Logic 101)',
			percentage: 100,
			completed: true,
		},
		{
			course: 'Belajar Dasar Pemrograman Web',
			percentage: 98,
			completed: false,
		},
	],
	assignments: [
		{
			title: 'Latihan - Matriks Manajemen Prioritas',
			submitted: true,
			status: 'ontime',
		},
		{
			title: 'ILT Soft skill - Time Management',
			submitted: true,
			status: 'late',
		},
		{
			title: 'Capstone Project',
			submitted: false,
			status: 'not submitted',
		},
	],
};

function loadProfile(data){
	let content = "<h3>Profile</h3>"
	content += "<center><img src='" + data.profile.photo + "' alt='Foto Profil'></center>"
	content += "<p><small>ID</small><br><b>" + data.profile.id + "</b></p>"
	content += "<p><small>Nama</small><br><b>" + data.profile.name.toUpperCase() + "</b></p>"
	content += "<p><small>Universitas</small><br><b>" + data.profile.university + "</b></p>"
	content += "<p><small>Email<br><b>" + data.profile.email + "</b></small></p>"
	content += "<p><small>Lecturer<br><b>" + data.profile.lecturer + "</b></small></p>"
	content += "<p><small>Dedicated Mentor<br><b>" + data.profile.dedicated_mentor + "</b></small></p>"
	content += "<p><small>Expert Mentor<br>"
	for(expert of data.profile.expert_mentor){
		content += "<b>" + expert + "</b></br>"
	}
	content += "</small>"
	document.getElementById('profile').innerHTML = content;

}

function loadAttendance(data){
	if (data.attendance === null) {
		let avgAttendance = 0;
		let content = "<h3>Attendances ("+ avgAttendance +"%)</h3>"
		content += "<p>You have no attendance data.</p>"
		document.getElementById("attendances").innerHTML = content;
		return;
	}

	let countAttending = data.attendance.filter((s) => s.attending).length;
	let avgAttendance = (countAttending / data.attendance.length * 100).toFixed(0);
	let content = "<h3>Attendances ("+ avgAttendance +"%)</h3>"
	content += "<p>Berikut ini adalah rekap kehadiran Anda dari rangkaian kegiatan sinkronus (Live YouTube/Google Meet) Studi Independen Bersertifikat bersama Dicoding 2021.</p>"
	for (item of data.attendance) {
		content += "<div><span class='icon'>"
		content += "<i class='fas fa-"+ (item.attending === true ? 'check-circle success' : 'times-circle danger' ) +"'></i></span>"
		content += "<span class='item'> "
		content += item.session
		content += "</span></div>"
	}
	document.getElementById("attendances").innerHTML = content;
}

function loadCourseProgress(data){
	if (data.course_progress === null) {
		let avgProgress = 0;
		let content = "<h3>Course Progress ("+ avgProgress +"%)</h3>"
		content += "<p>You have no course progress data.</p>"
		document.getElementById("course-progress").innerHTML = content;
		return;
	}

	let avgProgress = Object
        .values(data.course_progress)
        .reduce((avg, { percentage }, _, { length }) => avg + percentage / length, 0)
        .toFixed(0);
	let content = "<h3>Course Progress ("+ avgProgress +"%)</h3>"
	content += "<p>Berikut ini adalah progress Anda dalam pengerjaan kelas di LMS Dicoding</p>"
	for (item of data.course_progress) {
		content += "<div><span class='icon'>"
		content += "<i class='fas fa-"+ (item.completed === true ? 'check-circle success' : 'spinner warning' ) +"'></i></span>"
		content += "<span class='item'> "
		content += (item.completed === true ? 'Completed' : item.percentage+"%" )
		content += " - "
		content += item.course
		content += "</span></div>"
	}
	document.getElementById("course-progress").innerHTML = content;
}

function loadAssignments(data){
	if (data.assignments === null) {
		let avgAssignment = 0;
		let content = "<h3>Assigments ("+ avgAssignment +"%)</h3>"
		content += "<p>You have no assignment data.</p>"
		document.getElementById("assignments").innerHTML = content;
		return;
	}

	let countAssignments = data.assignments.filter((s) => s.submitted).length;
	let avgAssignment = (countAssignments / data.assignments.length * 100).toFixed(0);
	let content = "<h3>Assignments ("+ avgAssignment +"%)</h3>"
	content += "<p>Berikut ini adalah rekap tugas yang diberikan kepada Anda selama menjalani program Studi Independen Bersertifikat bersama Dicoding 2021</p>"
	for (item of data.assignments) {
		content += "<div><span class='icon'>"
		content += "<i class='fas fa-"+ (item.submitted && item.status === 'ontime' ? 'check-circle success' : (item.submitted && item.status === 'late' ? 'check-circle warning' : 'exclamation-circle danger') ) +"'></i></span>"
		content += "<span class='item'> "
		content += (item.submitted && item.status === 'ontime' ? '[Submitted]' : (item.submitted && item.status === 'late' ? '[Late]' : '[Not submitted]') ) + ' '
		content += item.title
		content += "</span></div>"
	}
	document.getElementById("assignments").innerHTML = content;
}

function main(){
	loadProfile(data);
	loadCourseProgress(data);
	loadAttendance(data);
	loadAssignments(data)
}

main();