import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/v1';
// ONLY FOR DEVELOPMENT
axios.defaults.withCredentials = true;


export default {    

    // ONLY FOR DEVELOPMENT
    doFakeLogin() {
        return axios.get('/fakelogin').then(response => console.log(response)).catch(error => console.log(error));
    },

    getAllElections() {
        return axios.get('/election').then(
            response => response.data
        ).catch(
            //error
        );
    },

    getElection(id) {
        return axios.get('/election/' + id)
            .then(response => response.data);
    },

    getName() {

        return null;
    },

    getVoterElection(token) {

        return axios.get('/vote/' + token)
            .then(response => response.data);
    },

    startElection(id) {

        return null;
    },

    pauseElection(id) {

        return null;
    },

    endElection(id) {

        return null;
    },

    remindeElection(id) {

        return null;
    },

    addVoters(id, emails) {

        return null;
    },

    removeVoter(id, email) {

        return null;
    },

    addOption(id, name) {

        return null;
    },

    removeOption(id, name) {

        return null;
    },

    createElection(){
        return null;
    },

    updateElection(id, election){
        return null;
    },

    updateOptions(id, election){
        //just for emergency
        return null;
    },

    getReport(id){
        return null;
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