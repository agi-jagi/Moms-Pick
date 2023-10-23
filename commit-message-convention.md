# 📗 Commit Message Convention

프로젝트에서 사용할 커밋 메시지 형식을 정리한 문서입니다.  

```
<type>[(<scope>)]: <description>

[optional body]

[optional footer(s)]
```

## Commit Types

- `feat`: 사용자를 위한 새로운 기능 추가  
- `fix`: 사용자를 위한 버그 수정  
- `perf`: 성능 개선을 위한 변경  
- `refactor`: 기능 추가, 버그 수정의 목적이 아닌 코드 리팩토링을 담은 변경  
- `docs`: 마크 다운 작성, 주석 작성 등의 문서 작업  
- `style`: 코드의 의미를 변경하지 않는 formatting 등의 변경  
- `test:` 테스트 관리를 위한 변경  
- `ci`: CI를 위한 변경  
- `build`: 빌드 설정, 개발툴 변경 등 사용자와 관련 없는 변경  
- `chore`: 소스 파일 혹은 테스트 파일의 변화가 없는 단순 작업  
- `revert`: 이전 커밋 취소  

## Reference Projects

실제 좋은 사례들을 직접 보는 것이 도움이 될 것 같아 아래에 외부 프로젝트 링크를 첨부하였습니다.  

- [armeria](https://github.com/line/armeria/commits/main)  
- [renovate](https://github.com/renovatebot/renovate/commits/main)  

## References

- ["When to use "chore" as type of commit message?", Stack Overflow](https://stackoverflow.com/questions/26944762/when-to-use-chore-as-type-of-commit-message)  
- ["How to Write Better Git Commit Messages - A Step-By-Step Guide", Natalie Pina](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)  