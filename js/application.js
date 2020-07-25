import { Octokit } from "https://cdn.pika.dev/@octokit/core";

let res = await octokit.request('GET /repos/{owner}/{repo}', {
  owner: 'octocat',
  repo: 'hello-world'
})