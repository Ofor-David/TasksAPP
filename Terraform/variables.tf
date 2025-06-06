variable "aws_access_key" {
  description = "AWS Access Key"
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  description = "AWS Secret Key"
  type        = string
  sensitive   = true
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}

variable "aws_az1" {
  description = "aws az"
  type = string
  default = "us-east-1a"
}
variable "aws_az2" {
  description = "aws az"
  type = string
  default = "us-east-1b"
}

variable "aws_key_name" {
  description = "aws key"
  type = string 
  sensitive = true
}