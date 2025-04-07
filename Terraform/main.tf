# provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

# VPC
resource "aws_vpc" "dotCorp" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"
  
  tags = {
    Name = "dotCorp"
  }
}

# subnets
# public subnet 1
resource "aws_subnet" "public-subnet-1" {
  vpc_id     = aws_vpc.dotCorp.id
  cidr_block = "10.0.1.0/24"
  availability_zone = var.aws_az1

  tags = {
    Name = "public-subnet-1"
  }
}
# private subnet 1
resource "aws_subnet" "private-subnet-1" {
  vpc_id     = aws_vpc.dotCorp.id
  cidr_block = "10.0.2.0/24"
  availability_zone = var.aws_az2

  tags = {
    Name = "private-subnet-1"
  }
}
# private subnet 2
resource "aws_subnet" "private-subnet-2" {
  vpc_id     = aws_vpc.dotCorp.id
  cidr_block = "10.0.3.0/24"
  availability_zone = var.aws_az2

  tags = {
    Name = "private-subnet-2"
  }
}
# igw
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.dotCorp.id
  tags = {
    Name = "dotCorp-igw"
  }
}

#rtb
resource "aws_route_table" "dotCorp-public-rtb" {
  vpc_id = aws_vpc.dotCorp.id

  route {
    cidr_block = "10.0.0.0/16"
    gateway_id = "local"
  }
 
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "dotCorp-public-rtb"
  }
}
resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public-subnet-1.id
  route_table_id = aws_route_table.dotCorp-public-rtb.id
}

resource "aws_route_table" "dotCorp-private-rtb" {
  vpc_id = aws_vpc.dotCorp.id

  # depends_on = [aws_nat_gateway.dotCorp-ngw]
  route {
    cidr_block = "10.0.0.0/16"
    gateway_id = "local"
  }
 
 /*  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.dotCorp-ngw.id
  }  */

  tags = {
    Name = "dotCorp-private-rtb"
  }
}
resource "aws_route_table_association" "private-1" {
  subnet_id      = aws_subnet.private-subnet-1.id
  route_table_id = aws_route_table.dotCorp-private-rtb.id
}
resource "aws_route_table_association" "private-2" {
  subnet_id      = aws_subnet.private-subnet-2.id
  route_table_id = aws_route_table.dotCorp-private-rtb.id
}
resource "aws_main_route_table_association" "set-main-rtb" {
  vpc_id         = aws_vpc.dotCorp.id
  route_table_id = aws_route_table.dotCorp-public-rtb.id
}


/* # Create Elastic IP for NAT Gateway
resource "aws_eip" "nat-eip" {
  domain = "vpc"
  tags = {
    Name = "nat-eip"
  }
}
# nat
resource "aws_nat_gateway" "dotCorp-ngw" {
  depends_on = [ aws_internet_gateway.gw, aws_eip.nat-eip]
  allocation_id = aws_eip.nat-eip.id
  subnet_id     = aws_subnet.public-subnet-1.id
  tags = {  
    Name = "dotCorp-ngw"
  }
}
 */

# sg
resource "aws_security_group" "public-sg" {
  name        = "dotCorp-public-sg"
  description = "Allow inbound traffic and all outbound traffic"
  vpc_id      = aws_vpc.dotCorp.id
  tags = {
    Name = "dotCorp-public-sg"
  }
}
resource "aws_vpc_security_group_ingress_rule" "allow-tcp" {
  security_group_id = aws_security_group.public-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}
resource "aws_vpc_security_group_ingress_rule" "allow-https" {
  security_group_id = aws_security_group.public-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}
resource "aws_vpc_security_group_egress_rule" "allow-all-traffic-ipv4" {
  security_group_id = aws_security_group.public-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

# sg private
resource "aws_security_group" "private-sg" {
  name        = "dotCorp-private-sg"
  description = "Allow inbound traffic from vpc and all outbound traffic"
  vpc_id      = aws_vpc.dotCorp.id
  tags = {
    Name = "dotCorp-private-sg"
  }
}
resource "aws_vpc_security_group_ingress_rule" "allow-ssh" {
  security_group_id = aws_security_group.private-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}
/* resource "aws_vpc_security_group_ingress_rule" "private-allow-tcp" {
  security_group_id = aws_security_group.private-sg.id
  cidr_ipv4         = "10.0.0.0/16"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
} */
resource "aws_vpc_security_group_egress_rule" "private-allow-all-traffic-ipv4" {
  security_group_id = aws_security_group.private-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}
