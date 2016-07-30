'use strict';
var ideaId = '';
(function(){


class ContestComponent {
  constructor($http, $scope, socket, $stateParams, Auth ) {
    this.$http = $http;
    this.socket = socket;
    ideaId = $stateParams.contestID;
    this.comments = [];
    this.awesomeIdeas = [];
    this.getCurrentUser = Auth.getCurrentUser;
  }
  
  $onInit() {
    this.$http.get('/api/contest/' + ideaId)
      .then(response => {
        this.ideaDetails = response.data;
        this.socket.syncUpdates('idea', this.ideaDetails);
      });
      this.$http.get('/api/comments')
        .then(response => {
          this.comments = response.data.filter(this.isRelatedToIdea); // Filter only relevant comments
          this.socket.syncUpdates('comment', this.comments);
      });
       this.$http.get('/api/ideas/')
          .then(response => {
            this.awesomeIdeas = response.data.filter(this.isRelatedToIdea); // Filter only relevant comments
            this.socket.syncUpdates('idea', this.awesomeIdeas);
          });
         
  }

   updateCampaign() {
      // if (this.newCampaign) {
      
        this.$http.put('/api/campaigns/'+ideaId, {
          name: this.updatedCampaign,
          info: this.updateCampaignInfo,
          privacy: this.updateCampaignPrivacy,
          image: this.updateCampaignImage,
          rewards: this.updateCampaignRewards,
          documents: this.updateCampaignDoc,
          monetaryRewards: this.updateCampaignMonetaryRewards
        });
        $route.reload(); 
        this.updatedCampaign = '';
        this.updateCampaignInfo = '';
        this.updateCampaignPrivacy = '';
        this.updateCampaignImage = '';
        this.updateCampaignRewards = '';
        this.updateCampaignDoc = '';
        this.updateCampaignMonetaryRewards = '';
      //}
    }
     addIdea() {
      if (this.newIdea) {
        this.$http.post('/api/ideas', {
          name: this.newIdea,
          info: this.newIdeaInfo,
          idea: ideaId
        });
        this.newIdea = '';
        this.newIdeaInfo = '';
      }
    }
    addFeedback(opinion, ideaId) {
      if (opinion && ideaId) {
        this.$http.post('/api/feedbacks', {
          opinion: opinion,
          idea: ideaId
        });
      }
    }
    createResponse(comment){
      $("#txtComment").attr("value","@"+comment.user); 
      //document.getElementById("txtComment").setAttribute("value","@admin");
    }

  
  addComment() {
    if (this.newComment) {
      this.$http.post('/api/comments', {
        comment: this.newComment,
        idea: ideaId,
        user: this.getCurrentUser().name 
      });
      //comment = '';
    }
  }

  isRelatedToIdea(commentObj) {
    return commentObj.idea === ideaId;
  }
  // checks if contest owner is vewing the site 
  isContestOwner(){
    if(this.ideaDetails.user.name == this.getCurrentUser().name){
      return true;
    }
    else{
      return false;
    }
    
   
  }
  
  deleteIdea(idea) {
    this.$http.delete('/api/ideas/' + idea._id);
  }
  
}
angular.module('ideaApp')
  .component('contest', {
    templateUrl: 'app/contest/contest.html',
    controller: ContestComponent
  });

})();
