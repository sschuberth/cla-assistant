// unit test
var assert = require('assert');
var sinon = require('sinon');

// services
var github = require('../../../server/services/github');
var pullRequest = require('../../../server/services/pullRequest');
var status = require('../../../server/services/status');
var cla = require('../../../server/services/cla');

//model
var User = require('../../../server/documents/user').User;
var CLA = require('../../../server/documents/cla').CLA;

// webhook under test
var pull_request = require('../../../server/webhooks/pull_request');

describe('webhook pull request', function(test_done) {
	afterEach(function(){
		User.findOne.restore();
		cla.check.restore();
	});
	it('should update status of pull request if not signed', function(test_done){
		var user_save = function(){
			assert(this.requests);
		};
		sinon.stub(User, 'findOne', function(args, done){
			done(null, {token: 'abc', save: user_save});
        });
        sinon.stub(cla, 'check', function(args, done){
			done(null, false);
        });

		var req = {args: {
			pull_request: testData,
			repository: testData.base.repo,
			number: testData.number,
			action: 'opened'
		}};

		var res = {status: function(status){
						assert.equal(status, 200);
						return {send: function(result){

						}};
					}};

		pull_request(req, res);
		assert(cla.check.called);
		assert(User.findOne.called);
		test_done();
	});

	xit('should update status of pull request if not signed and new user', function(test_done){
		var user_save = function(){
			assert(this.requests);
		};
		sinon.stub(User, 'findOne', function(args, done){
			done(null, {token: 'abc', save: user_save});
        });
        sinon.stub(cla, 'check', function(args, done){
			done(null, false);
        });

		var req = {args: {
			pull_request: testData,
			repository: testData.base.repo,
			number: testData.number,
			action: 'opened'
		}};

		var res = {status: function(status){
						assert.equal(status, 200);
						return {send: function(result){

						}};
					}};

		pull_request(req, res);
		assert(cla.check.called);
		assert(User.findOne.called);
		test_done();
	});
});

var testData = {
  'id': 1,
  'url': 'https://api.github.com/repos/octocat/Hello-World/pulls/1347',
  'html_url': 'https://github.com/octocat/Hello-World/pull/1347',
  'diff_url': 'https://github.com/octocat/Hello-World/pull/1347.diff',
  'patch_url': 'https://github.com/octocat/Hello-World/pull/1347.patch',
  'issue_url': 'https://api.github.com/repos/octocat/Hello-World/issues/1347',
  'commits_url': 'https://api.github.com/repos/octocat/Hello-World/pulls/1347/commits',
  'review_comments_url': 'https://api.github.com/repos/octocat/Hello-World/pulls/1347/comments',
  'review_comment_url': 'https://api.github.com/repos/octocat/Hello-World/pulls/comments/{number}',
  'comments_url': 'https://api.github.com/repos/octocat/Hello-World/issues/1347/comments',
  'statuses_url': 'https://api.github.com/repos/octocat/Hello-World/statuses/6dcb09b5b57875f334f61aebed695e2e4193db5e',
  'number': 1347,
  'state': 'open',
  'title': 'new-feature',
  'body': 'Please pull these awesome changes',
  'created_at': '2011-01-26T19:01:12Z',
  'updated_at': '2011-01-26T19:01:12Z',
  'closed_at': '2011-01-26T19:01:12Z',
  'merged_at': '2011-01-26T19:01:12Z',
  'head': {
    'label': 'new-topic',
    'ref': 'new-topic',
    'sha': '6dcb09b5b57875f334f61aebed695e2e4193db5e',
    'user': {
      'login': 'octocat',
      'id': 1,
      'avatar_url': 'https://github.com/images/error/octocat_happy.gif',
      'gravatar_id': '',
      'url': 'https://api.github.com/users/octocat',
      'html_url': 'https://github.com/octocat',
      'followers_url': 'https://api.github.com/users/octocat/followers',
      'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
      'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
      'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
      'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
      'organizations_url': 'https://api.github.com/users/octocat/orgs',
      'repos_url': 'https://api.github.com/users/octocat/repos',
      'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
      'received_events_url': 'https://api.github.com/users/octocat/received_events',
      'type': 'User',
      'site_admin': false
    },
    'repo': {
      'id': 1296269,
      'owner': {
        'login': 'octocat',
        'id': 1,
        'avatar_url': 'https://github.com/images/error/octocat_happy.gif',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/octocat',
        'html_url': 'https://github.com/octocat',
        'followers_url': 'https://api.github.com/users/octocat/followers',
        'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
        'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
        'organizations_url': 'https://api.github.com/users/octocat/orgs',
        'repos_url': 'https://api.github.com/users/octocat/repos',
        'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/octocat/received_events',
        'type': 'User',
        'site_admin': false
      },
      'name': 'Hello-World',
      'full_name': 'octocat/Hello-World',
      'description': 'This your first repo!',
      'private': false,
      'fork': true,
      'url': 'https://api.github.com/repos/octocat/Hello-World',
      'html_url': 'https://github.com/octocat/Hello-World',
      'clone_url': 'https://github.com/octocat/Hello-World.git',
      'git_url': 'git://github.com/octocat/Hello-World.git',
      'ssh_url': 'git@github.com:octocat/Hello-World.git',
      'svn_url': 'https://svn.github.com/octocat/Hello-World',
      'mirror_url': 'git://git.example.com/octocat/Hello-World',
      'homepage': 'https://github.com',
      'language': null,
      'forks_count': 9,
      'stargazers_count': 80,
      'watchers_count': 80,
      'size': 108,
      'default_branch': 'master',
      'open_issues_count': 0,
      'has_issues': true,
      'has_wiki': true,
      'has_pages': false,
      'has_downloads': true,
      'pushed_at': '2011-01-26T19:06:43Z',
      'created_at': '2011-01-26T19:01:12Z',
      'updated_at': '2011-01-26T19:14:43Z',
      'permissions': {
        'admin': false,
        'push': false,
        'pull': true
      }
    }
  },
  'base': {
    'label': 'master',
    'ref': 'master',
    'sha': '6dcb09b5b57875f334f61aebed695e2e4193db5e',
    'user': {
      'login': 'octocat',
      'id': 1,
      'avatar_url': 'https://github.com/images/error/octocat_happy.gif',
      'gravatar_id': '',
      'url': 'https://api.github.com/users/octocat',
      'html_url': 'https://github.com/octocat',
      'followers_url': 'https://api.github.com/users/octocat/followers',
      'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
      'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
      'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
      'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
      'organizations_url': 'https://api.github.com/users/octocat/orgs',
      'repos_url': 'https://api.github.com/users/octocat/repos',
      'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
      'received_events_url': 'https://api.github.com/users/octocat/received_events',
      'type': 'User',
      'site_admin': false
    },
    'repo': {
      'id': 1296269,
      'owner': {
        'login': 'octocat',
        'id': 1,
        'avatar_url': 'https://github.com/images/error/octocat_happy.gif',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/octocat',
        'html_url': 'https://github.com/octocat',
        'followers_url': 'https://api.github.com/users/octocat/followers',
        'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
        'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
        'organizations_url': 'https://api.github.com/users/octocat/orgs',
        'repos_url': 'https://api.github.com/users/octocat/repos',
        'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/octocat/received_events',
        'type': 'User',
        'site_admin': false
      },
      'name': 'Hello-World',
      'full_name': 'octocat/Hello-World',
      'description': 'This your first repo!',
      'private': false,
      'fork': true,
      'url': 'https://api.github.com/repos/octocat/Hello-World',
      'html_url': 'https://github.com/octocat/Hello-World',
      'clone_url': 'https://github.com/octocat/Hello-World.git',
      'git_url': 'git://github.com/octocat/Hello-World.git',
      'ssh_url': 'git@github.com:octocat/Hello-World.git',
      'svn_url': 'https://svn.github.com/octocat/Hello-World',
      'mirror_url': 'git://git.example.com/octocat/Hello-World',
      'homepage': 'https://github.com',
      'language': null,
      'forks_count': 9,
      'stargazers_count': 80,
      'watchers_count': 80,
      'size': 108,
      'default_branch': 'master',
      'open_issues_count': 0,
      'has_issues': true,
      'has_wiki': true,
      'has_pages': false,
      'has_downloads': true,
      'pushed_at': '2011-01-26T19:06:43Z',
      'created_at': '2011-01-26T19:01:12Z',
      'updated_at': '2011-01-26T19:14:43Z',
      'permissions': {
        'admin': false,
        'push': false,
        'pull': true
      }
    }
  },
  'user': {
    'login': 'octocat',
    'id': 1,
    'avatar_url': 'https://github.com/images/error/octocat_happy.gif',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/octocat',
    'html_url': 'https://github.com/octocat',
    'followers_url': 'https://api.github.com/users/octocat/followers',
    'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
    'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
    'organizations_url': 'https://api.github.com/users/octocat/orgs',
    'repos_url': 'https://api.github.com/users/octocat/repos',
    'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/octocat/received_events',
    'type': 'User',
    'site_admin': false
  },
  'merge_commit_sha': 'e5bd3914e2e596debea16f433f57875b5b90bcd6',
  'merged': false,
  'mergeable': true,
  'merged_by': {
    'login': 'octocat',
    'id': 1,
    'avatar_url': 'https://github.com/images/error/octocat_happy.gif',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/octocat',
    'html_url': 'https://github.com/octocat',
    'followers_url': 'https://api.github.com/users/octocat/followers',
    'following_url': 'https://api.github.com/users/octocat/following{/other_user}',
    'gists_url': 'https://api.github.com/users/octocat/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/octocat/subscriptions',
    'organizations_url': 'https://api.github.com/users/octocat/orgs',
    'repos_url': 'https://api.github.com/users/octocat/repos',
    'events_url': 'https://api.github.com/users/octocat/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/octocat/received_events',
    'type': 'User',
    'site_admin': false
  },
  'comments': 10,
  'commits': 3,
  'additions': 100,
  'deletions': 3,
  'changed_files': 5
};
