# Notes
* Api only uses _quil_session for authentication (Only header that matters other than user-agent)
* Even though it changes on every request, it seems we can reuse the same session id for all of our calls
* All responses from api are gzip compressed json

# Program steps
* Fetch assignment toc
* Get assignment (multithreaded workers???)
* Fetch assignment toc
* From assignment toc fetch possible answers
* Choose answer with Optimal = True