import axios from 'axios';

axios.defaults.baseURL = '/api/v1';

export default {    

    getAllElections() {
        return axios.get('/election').then(
            response => response.data
        );
    },

    getElection(id) {
        return axios.get('/election/' + id)
            .then(response => response.data);
    },

    getUserName() {
        return axios.get('/user')
            .then(response => response.data);
    },

    getVoterElection(token) {
        return axios.get('/vote/' + token)
            .then(response => response.data);
    },

    vote(token, votes) {
        return axios.post('/vote/' + token, {votes: votes})
            .then(response => response.data);
    },

    startElection(id) {
        return axios.post('/election/' + id + '/start')
            .then(response => response.data);
    },

    pauseElection(id) {
        return axios.post('/election/' + id + '/pause')
            .then(response => response.data);
    },

    endElection(id) {
        return axios.post('/election/' + id + '/end')
            .then(response => response.data);
    },

    remindeElection(id) {
        return axios.post('/election/' + id + '/remind')
            .then(response => response.data);
    },

    addVoters(id, voters) {
        return axios.post('/election/' + id + '/voter', {voters: voters})
            .then(response => response.data);
    },

    removeVoter(id, voter) {
        return axios.delete('/election/' + id + '/voter/' + voter)
            .then(response => response.data);
    },
    addOptions(id, options) {
        return axios.post('/election/' + id + '/option', {options: options})
            .then(response => response.data);
    },

    removeOption(id, index) {
        return axios.delete('/election/' + id + '/option/' + index)
            .then(response => response.data);
    },

    createElection(election) {
        return axios.post('/election', election)
            .then(response => response.data);
    },

    updateElection(id, election) {
        return axios.patch('/election/' + id, election)
            .then(response => response.data);
    },

    updateOptions(id, election){
        //just for emergency
        return null;
    },

    getReport(id){
        return axios.get('/election/' + id + '/results', { responseType: 'blob'})
            .then(response => response);
    },

}


class Election{

    constructor( id, name, description, options, voters, votable, creationDate, startDate, endDate, paused, voted){
        this.id = id;
        this.name = name;
        this.description = description;
        this.options=options;
        this.votable=votable;
        this.voters=voters;
        this.creationDate = creationDate;
        this.endDate = endDate;
        this.startDate = startDate;
        this.paused = paused;
        this.voted = voted;
    }

}