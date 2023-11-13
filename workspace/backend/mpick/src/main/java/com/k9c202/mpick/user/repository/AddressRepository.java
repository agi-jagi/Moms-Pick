package com.k9c202.mpick.user.repository;

import com.k9c202.mpick.user.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    // list일 경우 optional 사용X (optional은 하나일 경우 사용)
    // address.user.loginId
    List<Address> findAllByUserLoginId(String loginId);

    Optional<Address> findByIdAndUserLoginId(Long id, String loginId);

    Optional<Address> findByUserLoginIdAndIsSet(String loginId, boolean isSet);

    // TODO: 2023-11-13 미해결
    void deleteByIdAndUserLoginId(Long id, String loginId);

}
