import styled from 'styled-components/native';

export const Container = styled.View`
  
`;

export const Post = styled.View`
  margin-top: 10px;
`;

export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;



export const Name = styled.Text`
  fontSize: 15;
	fontStyle: italic;
`;

export const Description = styled.Text`
	margin-left: auto;
	margin-right: auto;
	max-width: 1280px;
	padding-bottom: 30px;
	padding-top: 40px;
	text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: '#999'
})`
  margin: 30px 0;
`;