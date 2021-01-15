import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/v1';


export default {    

    getAllElections() {

        

        return axios.get('/election').then(
            response => {
                e = Election(response.data);
                console.log(e);
            }
            
        ).catch(
            //error
        ) ;
    },

    getElection(id) {

        return null;
    },

    getName() {

        return null;
    },

    getVoterElection() {

        return null;
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
        //just for emergancy
        return null;
    },

    getReport(id){
        return null;
    },





}

/*
export default class Election{

    constructor( id, name, description, options, voters, votable, creationDate, startDate, endDate, paused, numberVoted){
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
        this.numberVoted = numberVoted;
    }

}
*/