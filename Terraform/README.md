# AWS Terraform Setup 

This sets up a basic AWS infrastructure using Terraform. It includes a Virtual Private Cloud (VPC), subnets, route tables, security groups, and other essential components to support a scalable and secure cloud environment.  

## Features  

- **VPC**: A custom VPC with CIDR block `10.0.0.0/16`.  
- **Subnets**:  
    - One public subnet (`10.0.1.0/24`).  
    - Two private subnets (`10.0.2.0/24` and `10.0.3.0/24`).  
- **Internet Gateway**: Enables internet access for resources in the public subnet.  
- **Route Tables**:  
    - Public route table with routes for internet access.  
    - Private route table for internal communication.  
- **Security Groups**:  
    - Public security group allowing HTTP (80), HTTPS (443), and all outbound traffic.  
    - Private security group allowing SSH (22) and all outbound traffic.  

## Prerequisites  

- Terraform installed on your local machine. 
- AWS credentials with sufficient permissions to create resources.  
- Variables for the following:  
    - `aws_region`: AWS region to deploy the infrastructure.  
    - `aws_access_key` and `aws_secret_key`: AWS credentials.  
    - `aws_az1` and `aws_az2`: Availability zones for subnets.  

## Usage  

1. Clone this repository.  
2. Navigate to the Terraform directory:  
     ```bash  
     cd Terraform 
     ```  
3. Initialize Terraform:  
     ```bash  
     terraform init  
     ```  
4. Review the execution plan:  
     ```bash  
     terraform plan  
     ```  
5. Apply the configuration to create resources:  
     ```bash  
     terraform apply  
     ```  
6. Confirm the changes by typing `yes` when prompted.  

## Notes  

- The NAT Gateway, Elastic IP and private route table route resources are commented out in the configuration. Uncomment them if needed for private subnet internet access.  
- Ensure proper IAM permissions for the AWS credentials used.  

## Cleanup  

To destroy the infrastructure, run:  
```bash  
terraform destroy  
```  

## License  

This project is licensed under the MIT License.  
