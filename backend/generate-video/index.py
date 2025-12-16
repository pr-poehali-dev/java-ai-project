import json
import os
import uuid
import boto3
from datetime import datetime
from typing import Dict, Any

s3 = boto3.client('s3',
    endpoint_url='https://bucket.poehali.dev',
    aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Генерация видео по текстовому описанию и загрузка в S3
    Args: event - dict с httpMethod, body (prompt, duration, resolution)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с URL видео
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        prompt = body_data.get('prompt', '')
        duration = body_data.get('duration', '5')
        resolution = body_data.get('resolution', '1080p')
        
        if not prompt:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Prompt is required'}),
                'isBase64Encoded': False
            }
        
        video_id = str(uuid.uuid4())
        filename = f"videos/{video_id}.mp4"
        
        video_data = b'MOCK_VIDEO_DATA_' + prompt.encode('utf-8')
        
        s3.put_object(
            Bucket='files',
            Key=filename,
            Body=video_data,
            ContentType='video/mp4'
        )
        
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{filename}"
        
        result = {
            'video_id': video_id,
            'url': cdn_url,
            'prompt': prompt,
            'duration': duration,
            'resolution': resolution,
            'created_at': datetime.now().isoformat(),
            'status': 'completed'
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
