const fetchMessages = () => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });
        }

        fetch('http://localhost:3001/api/messages/inbox/?limit=20', {
            headers: {
                'Wilma2SID': Wilma2SID
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: 'Invalid request', error: json, status: 400 })
                    case 401:
                        return reject({ err: 'Invalid credentials', error: json, status: 401, redirect: true })
                    case 500:
                        return reject({ err: "Internal server error", status: 500 })
                    case 501:
                        return reject({ err: "Failed to reach Wilma's servers", error: json, status: 503 })
                    default:
                        return reject({ err: 'Received an unexpected response from servers', status: res.status })
                }
            })
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fetchGradeBook = (filter) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400, redirect: true });
        }

        fetch(`http://localhost:3001/api/gradebook/?filter=${filter}`, {
            headers: {
                'Wilma2SID': Wilma2SID
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: 'Invalid request', error: json, status: 400 })
                    case 401:
                        return reject({ err: 'Invalid credentials', error: json, status: 401, redirect: true })
                    case 500:
                        return reject({ err: "Internal server error", status: 500 })
                    case 501:
                        return reject({ err: "Failed to reach Wilma's servers", error: json, status: 403 })
                    default:
                        return reject({ err: 'Received an unexpected response from servers', status: res.status })
                }
            })
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fectchCourseList = () => {
    return new Promise((resolve, reject) => {

        fetch('http://localhost:3001/api/lops/courses/list', {
            method: 'GET'
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: 'Invalid request', error: json, status: 400 })
                    case 401:
                        return reject({ err: 'Invalid credentials', error: json, status: 401, redirect: true })
                    case 500:
                        return reject({ err: "Internal server error", status: 500 })
                    case 501:
                        return reject({ err: "Failed to reach Wilma's servers", error: json, status: 403 })
                    default:
                        return reject({ err: 'Received an unexpected response from servers', status: res.status })
                }
            })
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    })
}

const fetchCourse = (id) => {
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:3001/api/lops/courses/get/${id}`, {
            method: 'GET'
        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: 'Invalid request', error: json, status: 400 })
                    case 401:
                        return reject({ err: 'Invalid credentials', error: json, status: 401, redirect: true })
                    case 500:
                        return reject({ err: "Internal server error", status: 500 })
                    case 501:
                        return reject({ err: "Failed to reach Wilma's servers", error: json, status: 403 })
                    default:
                        return reject({ err: 'Received an unexpected response from servers', status: res.status })
                }
            })
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    })
}

const fetchSchedule = (date = { dd: String, mm: String, yyyy: String }) => {
    return new Promise((resolve, reject) => {

        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', status: 400 });
        }

        if (!StudentID) {
            return reject({ err: 'Missing StudentID', status: 400 });
        }

        fetch(`http://localhost:3001/api/schedule/${date.mm}.${date.dd}.${date.yyyy}`, {
            method: 'GET',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: 'Invalid request', error: json, status: 400 })
                    case 401:
                        return reject({ err: 'Invalid credentials', error: json, status: 401, redirect: true })
                    case 500:
                        return reject({ err: "Internal server error", status: 500 })
                    case 501:
                        return reject({ err: "Failed to reach Wilma's servers", error: json, status: 403 })
                    default:
                        return reject({ err: 'Received an unexpected response from servers', status: res.status })
                }
            })
            .catch(err => {
                console.log(err);
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    })
}