# Module 15 - Cloud Fundamentals Exercise (AWS)

The handbook has no hands-on file for this module — reading links only.
This is a guided AWS Free Tier lab covering the services listed in the
module's learning objectives. Use an AWS Free Tier account
(https://aws.amazon.com/free) — every service below has a free-tier
allowance sufficient for this exercise. **Remember to delete/stop
resources at the end of each part to avoid charges.**

## Part A - EC2
1. Launch a `t2.micro` EC2 instance (Amazon Linux 2023 AMI).
2. Create a new key pair, download the `.pem` file.
3. Create a security group allowing inbound SSH (port 22) from your IP
   only, and HTTP (port 80) from anywhere.
4. Connect via SSH: `ssh -i your-key.pem ec2-user@<public-ip>`.
5. Install and start a simple web server: `sudo yum install -y httpd && sudo systemctl start httpd`.
6. Confirm you can reach `http://<public-ip>` in a browser.
7. **Cleanup:** terminate the instance when done.

## Part B - S3
1. Create an S3 bucket with a globally-unique name.
2. Upload a small text file.
3. Try opening its object URL directly (should fail — bucket is private
   by default). Note why that's the correct default behavior.
4. Look at the available Storage Classes (Standard, Intelligent-Tiering,
   Standard-IA, Glacier) and write one sentence on when you'd use each.
5. **Cleanup:** delete the object and the bucket.

## Part C - VPC
1. Create a new VPC with one public subnet and one private subnet.
2. Attach an Internet Gateway to the VPC and add a route from the public
   subnet's route table to it.
3. Explain (in your notes) why the private subnet should NOT have a
   route to the Internet Gateway.
4. **Cleanup:** delete the VPC and its associated resources.

## Part D - RDS
1. Launch a free-tier `db.t3.micro` RDS instance (MySQL or PostgreSQL).
2. Note the Multi-AZ option in the console — leave it off for this
   free-tier exercise, but note in your notes what it's for.
3. Connect to it from a MySQL/psql client (or the AWS console's query
   editor if available for your engine) and run a simple `SELECT 1`.
4. **Cleanup:** delete the RDS instance (skip final snapshot for this
   exercise).

## Part E - Lambda + API Gateway
1. Create a Lambda function (runtime: Java or Node.js — pick whichever
   you're more comfortable with) that returns a simple JSON response,
   e.g. `{"message": "Hello from Lambda"}`.
2. Create an API Gateway REST API with a `GET /hello` route integrated
   with your Lambda function.
3. Deploy it to a `dev` stage and hit the generated invoke URL in a
   browser or with `curl`.
4. **Cleanup:** delete the API and the Lambda function.

## Deliverable: `CLOUD_NOTES.md`
For each part (A-E), write 2-3 sentences on what you built and one thing
that surprised you or was harder than expected.

## Self-Evaluation
- [ ] Launched and reached a web server on EC2
- [ ] Uploaded/inspected an object in S3 and understand storage classes
- [ ] Built a VPC with public + private subnets and explained the routing
- [ ] Connected to an RDS instance
- [ ] Deployed and invoked a Lambda function through API Gateway
- [ ] All resources cleaned up (no unexpected AWS charges)
- [ ] Completed `CLOUD_NOTES.md`
